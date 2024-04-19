while getopts d: flag; do
	case "${flag}" in
	d) directory=${OPTARG} ;;
	esac
done

# cd ../expo-updates-client
# npx expo export
# cd ../expo-updates-server
mkdir -p updates/$directory
rm -rf updates/$directory/
cp -r ../expo-client-updates/dist/ updates/$directory

node ./scripts/exportClientExpoConfig.js >updates/$directory/expoConfig.json

