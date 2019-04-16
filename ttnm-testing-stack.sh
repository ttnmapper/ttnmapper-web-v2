#!/bin/bash

#        ttnm-testing-stack
# --------------------------
#
# 	This script initializes a TTN-v3 stack on your local computer. This stack is
# 	used to run and test the TTN-Mapper application against.
# 
#       Usage
# -------------------------
# 
# ./script init /path/to/location
# 
#       Will initialize the environment in the provided folder, creating it if
#       it doesn't exist. Recommended location is ~/temp/ttnm-testing-stack
#
# ./script run /path/to/location
#
#		Will run the stack, basically calling docker-compose up. Run this in a
# 		seperate terminal, since it will stay open.

# Constants


# A
COMMAND=$1
STACK_PATH=$2

if [ -z "$1" ] || [ -z "$2" ]; then
	echo "Not enough arguments, require an instruction and location"
	exit
fi

if [ $COMMAND = init ];  then
	echo "Initializing environment"

	# Create the cirectory if it doesn't exist
	mkdir -p $STACK_PATH

	# Check if directory is empty
	if ! [ -z "$(ls -A $2)" ]; then
		read -p "Directory is not empty, are you sure? (y/n)" -n 1 -r
		echo

		if ! [[ $REPLY =~ ^[Yy]$ ]]; then
			echo "Exiting"
			exit
		fi

	fi

	cd $STACK_PATH

	# Clone the Repo, only the current master branch, we don't need history or other branches
	if ! [[ "$(git remote -v)" == *"https://github.com/TheThingsNetwork/lorawan-stack.git"* ]]; then
		git clone --branch master --depth 1 https://github.com/TheThingsNetwork/lorawan-stack.git .
	else
		echo "Git repo already cloned"
	fi
	# Get the frequency plans
	if ! [ -f "./config/frequency-plans.yml" ]; then
		curl https://raw.githubusercontent.com/TheThingsNetwork/lorawan-frequency-plans/master/frequency-plans.yml --output ./config/frequency-plans.yml
	fi

	# Generate local certificates, if folder does not exist yet
	# We need certs for the docker image, with correct permissions, but also for the ttn-lw-cli, with user permissions
	if ! [ -d "./certs" ]; then
		mkdir certs
		cd certs
		go run $(go env GOROOT)/src/crypto/tls/generate_cert.go -ca -host localhost
		cp cert.pem key.pem ../
		cd ..
		sudo chown 886:886 ./cert.pem ./key.pem
	else
		echo "Not creating certs, directory exists"
	fi

	# Pull docker images

	if ! [ -f "./docker_done" ]; then
		docker-compose pull
		docker-compose run --rm stack is-db init
		docker-compose run --rm stack is-db create-admin-user --id admin --email admin@localhost
		# Create the client for the cli
		docker-compose run --rm stack is-db create-oauth-client --id cli --name "Command Line Interface" --owner admin --no-secret --redirect-uri 'local-callback' --redirect-uri 'code'
		touch docker_done
	else
		echo "Docker setup already done"
	fi

	# Run the stack in the background
	docker-compose up -d

	# Start login process
	ttn-lw-cli --ca ./certs/cert.pem logout
	ttn-lw-cli --ca ./certs/cert.pem login 

	# Crete TTN Mapper oauth login
	# grant = 0 is GRANT_AUTHORIZATION_CODE, 2 is GRANT_REFRESH_TOKEN
	# rights are describer here: https://github.com/TheThingsNetwork/lorawan-stack/blob/5916eea48a47618c766ecc8354a85dca9adafc77/api/api.md#ttn.lorawan.v3.Right
	# 1 = RIGHT_USER_INFO, 6 = RIGHT_USER_APPLICATIONS_LIST, 8 = RIGHT_USER_GATEWAYS_LIST
	# 15 = RIGHT_APPLICATION_INFO, 20 = RIGHT_APPLICATION_DEVICES_READ,
	# 30 = RIGHT_GATEWAY_INFO, 38 = RIGHT_GATEWAY_STATUS_READ, 39 = RIGHT_GATEWAY_LOCATION_READ
	ttn-lw-cli --ca ./certs/cert.pem clients create --client-id ttnmapper --name "TTN Mapper" --user-id admin \
	--redirect-uris "localhost:8010/login_callback" --secret="supasecret" --grants 0,2 --rights 1,6,8,15,20,30,38,39 --state STATE_APPROVED

	# Create some users
	# User Allan,   - 3 applications, 2,3,4 devices each. Used for normal testing
	# User Belinda 	- 1 Application, 50 devices Testing Large number of devices
	# User Charlie 	- Nothing 
	# User Diane 	- 40 Applications, 1 device each. Other combo of large numbers
	# User Edgar	- 1 Application, no devices.
	# User Freddie 	- Fricking long name that wont render right - 1 Application, 1 device
	# User Giselle 	- Application, 2 devices
	# User Howard 	- 1 Application, 2 devices, shared from Giselle.
	# User Invalid 	- Nothing. Cancelles login due to wrong password

	# User Allan,   - 3 applications, 2,3,4 devices each. Used for normal testing
	ttn-lw-cli --ca ./certs/cert.pem users create --user-id uid-allan --primary-email-address allan@localhost --name Allan --password AllanAllan1
	ttn-lw-cli --ca ./certs/cert.pem application create --application-id app-allan-1 --name "Allan Application 1" --user-id uid-allan
	ttn-lw-cli --ca ./certs/cert.pem device create --application-id app-allan-1 --device-id dev-allan-1 --description "Allan device 1 description" --name "Allan device 1" --dev-eui 0111223344556601 --join-eui 8000000000010001 --lorawan-version 1.0.2 --lorawan-phy-version 1.0.2-b --frequency-plan-id EU_868_890
	ttn-lw-cli --ca ./certs/cert.pem device create --application-id app-allan-1 --device-id dev-allan-2 --description "Allan device 2 description" --name "Allan device 2" --dev-eui 0111223344556602 --join-eui 8000000000010002 --lorawan-version 1.0.2 --lorawan-phy-version 1.0.2-b --frequency-plan-id EU_868_890
	ttn-lw-cli --ca ./certs/cert.pem application create --application-id app-allan-2 --name "Allan Application 2" --user-id uid-allan
	ttn-lw-cli --ca ./certs/cert.pem device create --application-id app-allan-2 --device-id dev-allan-3 --description "Allan device 3 description" --name "Allan device 3" --dev-eui 0111223344556603 --join-eui 8000000000010003 --lorawan-version 1.0.2 --lorawan-phy-version 1.0.2-b --frequency-plan-id EU_868_890
	ttn-lw-cli --ca ./certs/cert.pem device create --application-id app-allan-2 --device-id dev-allan-4 --description "Allan device 4 description" --name "Allan device 4" --dev-eui 0111223344556604 --join-eui 8000000000010004 --lorawan-version 1.0.2 --lorawan-phy-version 1.0.2-b --frequency-plan-id EU_868_890
	ttn-lw-cli --ca ./certs/cert.pem device create --application-id app-allan-2 --device-id dev-allan-5 --description "Allan device 5 description" --name "Allan device 5" --dev-eui 0111223344556605 --join-eui 8000000000010005 --lorawan-version 1.0.2 --lorawan-phy-version 1.0.2-b --frequency-plan-id EU_868_890
	ttn-lw-cli --ca ./certs/cert.pem application create --application-id app-allan-3 --name "Allan Application 3" --user-id uid-allan
	ttn-lw-cli --ca ./certs/cert.pem device create --application-id app-allan-3 --device-id dev-allan-6 --description "Allan device 6 description" --name "Allan device 6" --dev-eui 0111223344556606 --join-eui 8000000000010006 --lorawan-version 1.0.2 --lorawan-phy-version 1.0.2-b --frequency-plan-id EU_868_890
	ttn-lw-cli --ca ./certs/cert.pem device create --application-id app-allan-3 --device-id dev-allan-7 --description "Allan device 7 description" --name "Allan device 7" --dev-eui 0111223344556607 --join-eui 8000000000010007 --lorawan-version 1.0.2 --lorawan-phy-version 1.0.2-b --frequency-plan-id EU_868_890
	ttn-lw-cli --ca ./certs/cert.pem device create --application-id app-allan-3 --device-id dev-allan-8 --description "Allan device 8 description" --name "Allan device 8" --dev-eui 0111223344556608 --join-eui 8000000000010008 --lorawan-version 1.0.2 --lorawan-phy-version 1.0.2-b --frequency-plan-id EU_868_890
	ttn-lw-cli --ca ./certs/cert.pem device create --application-id app-allan-3 --device-id dev-allan-9 --description "Allan device 9 description" --name "Allan device 9" --dev-eui 0111223344556609 --join-eui 8000000000010009 --lorawan-version 1.0.2 --lorawan-phy-version 1.0.2-b --frequency-plan-id EU_868_890


	# User Belinda 	- 1 Application, 50 devices Testing Large number of devices
	ttn-lw-cli --ca ./certs/cert.pem users create --user-id uid-belinda --primary-email-address belinda@localhost --name Belinda --password BelindaBelinda1
	ttn-lw-cli --ca ./certs/cert.pem application create --application-id app-belinda-1 --name "Belinda Application 1" --user-id uid-belinda
	# Create 40 devices for this application
	for i in $(seq -f "%02g" 1 40)
	do
		ttn-lw-cli --ca ./certs/cert.pem device create --application-id app-belinda-1 --device-id "dev-belinda-$i" --description "Belinda device $i description" --name "Belinda device $i" --dev-eui "02112233445566$i" --join-eui "80000000000200$i" --lorawan-version 1.0.2 --lorawan-phy-version 1.0.2-b --frequency-plan-id EU_868_890
	done


	# User Charlie 	- Nothing 
	ttn-lw-cli --ca ./certs/cert.pem users create --user-id uid-charlie --primary-email-address charlie@localhost --name "Charles Brown, Esq" --password CharlieCharlie1


	# User Diane 	- 40 Applications, 1 device each. Other combo of large numbers
	ttn-lw-cli --ca ./certs/cert.pem users create --user-id uid-diane --primary-email-address diane@localhost --name Diane --password DianeDiane1
	# Create 40 applications, 1 device each
	for i in $(seq -f "%02g" 1 40)
	do
		ttn-lw-cli --ca ./certs/cert.pem application create --application-id "app-diane-$i" --name "Diane Application $i" --user-id uid-diane
		ttn-lw-cli --ca ./certs/cert.pem device create --application-id "app-diane-$i" --device-id "dev-diane-$i" --description "Diane device $i description" --name "Diane device $i" --dev-eui "04112233445566$i" --join-eui "80000000000400$i" --lorawan-version 1.0.2 --lorawan-phy-version 1.0.2-b --frequency-plan-id EU_868_890
	done


	# Edgar - one application, no devices
	ttn-lw-cli --ca ./certs/cert.pem application create --application-id app-freddie-1 --name "Freddie Application 1" --user-id uid-freddie


	# Freddie - An anoyingly long name
	ttn-lw-cli --ca ./certs/cert.pem users create --user-id uid-freddie --primary-email-address freddie@localhost --name "Freddie fricking long name that wont render right" --password FreddieFreddie1
	ttn-lw-cli --ca ./certs/cert.pem application create --application-id app-freddie-1 --name "Freddie Application 1" --user-id uid-freddie


	# User Giselle 	- Application, 2 devices
	ttn-lw-cli --ca ./certs/cert.pem users create --user-id uid-giselle --primary-email-address giselle@localhost --name Giselle --password GiselleGiselle1
	ttn-lw-cli --ca ./certs/cert.pem application create --application-id app-giselle-1 --name "Giselle Application 1" --user-id uid-giselle
	ttn-lw-cli --ca ./certs/cert.pem device create --application-id app-giselle-1 --device-id dev-giselle-1 --description "Giselle device 1 description" --name "Giselle device 9" --dev-eui 0711223344556601 --join-eui 8000000000070009 --lorawan-version 1.0.2 --lorawan-phy-version 1.0.2-b --frequency-plan-id EU_868_890
	ttn-lw-cli --ca ./certs/cert.pem device create --application-id app-giselle-1 --device-id dev-giselle-2 --description "Giselle device 2 description" --name "Giselle device 9" --dev-eui 0711223344556602 --join-eui 8000000000070009 --lorawan-version 1.0.2 --lorawan-phy-version 1.0.2-b --frequency-plan-id EU_868_890


	# User Howard - Shares application with Giselle
	ttn-lw-cli --ca ./certs/cert.pem users create --user-id uid-howard --primary-email-address howard@localhost --name Howard --password HowardHoward1
	ttn-lw-cli --ca ./certs/cert.pem applications collaborators set --application-id app-giselle-1 --user-id uid-howard --right-application-devices-read --right-application-info

	# User Invalid 	- Nothing. Cancelles login due to wrong password
	ttn-lw-cli --ca ./certs/cert.pem users create --user-id uid-ivan --primary-email-address ivan@localhost --name Ivan --password InvalidInvalid1


	docker-compose down

fi

if [ $COMMAND = run ]; then
	echo "Running environment"

	cd $STACK_PATH 
	docker-compose up -d
fi

if [ $COMMAND = stop ]; then
	echo "Stopping environment"

	cd $STACK_PATH 
	docker-compose down
fi
