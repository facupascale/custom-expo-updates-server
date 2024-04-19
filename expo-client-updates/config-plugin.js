const {
  withExpoPlist,
  withInfoPlist,
  withAndroidManifest,
} = require("@expo/config-plugins");

const customInfoPlist = (config) =>
  withInfoPlist(config, (config) => {
    config.modResults.NSAppTransportSecurity = {
      NSAllowsArbitraryLoads: true,
      NSExceptionDomains: {
        "http://66.97.34.155": {
          NSIncludesSubdomains: true,
          NSThirdPartyExceptionRequiresForwardSecrecy: false,
        },
      },
    };
    return config;
  });

const customExpoPlist = (config) =>
  withExpoPlist(config, (config) => {
    config.modResults.EXUpdatesCodeSigningCertificate =
      "-----BEGIN CERTIFICATE-----\nMIICzTCCAbWgAwIBAgIJGnHf0osQEoc2MA0GCSqGSIb3DQEBCwUAMA8xDTALBgNV\nBAMTBHRlc3QwIBcNMjIwNDE0MTY1MjE3WhgPMjEyMjA0MTQxNjUyMTdaMA8xDTAL\nBgNVBAMTBHRlc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDS+Jol\nAnxgRGlsfS5zTajApxCH2+Zg8q/b/CMDNprvkT19eRL/CL41O84v4BQICJ1nQOFs\n+DwmMwoi0iLeoT3tz2wTeS/pC0lKusx8KiSZrVh3HImYmEahSF5qznNEUNyXO74q\nKBf+1wINNKK4igcqrKyrfCDus76fOZ374WUMPMZn9pxFv5kqovpgCQBhdJ9IqQTQ\nZpV1qoyHwMmA3fDDsNTdGc127lbVli96pTlOmIuoX7sUdYJlTVmMr5KIvZmh95Wz\nPOihh5O1V7TGy7Ybfm9+tSHkqosO2dg6YTEZOxMxAM+6rERTtdOkuO0tlmRdiqP5\n/2ze3k4dzDMcCTn/AgMBAAGjKjAoMA4GA1UdDwEB/wQEAwIHgDAWBgNVHSUBAf8E\nDDAKBggrBgEFBQcDAzANBgkqhkiG9w0BAQsFAAOCAQEAUjjv9YiWBtbFfheB+QTK\nepnwCOH87e+ZZeFgQ4zOa+XKISKQ5EPGqDXXusSn+vf6n0Xz9TIZa+f0afPfefZi\n6k3KbSxmZ9XiZGPdI2hTbo8VUCxuYvdSB8R/Y5Gpabt1Wpuub//HHcORfr04WPCz\nAyIseRunLzxcT9X9z55XdhsoTo4V8AnkihFgjB8pNMKb6yfSM8YtvXfNR4QCusoK\nbbzsc2bURI2v2z7G6w76sQBdKGswG2gC2HGxhlAXMSJvJZyvQMXP+RaiLRMvDxhr\nNL8e5Y4+/HH1/m1EiXW3jssglgwGTdXG+3yS3z/CR2+ZpH9DuGR3II8T5AL6cGOi\nZA==\n-----END CERTIFICATE-----";
    config.modResults.EXUpdatesURL = "http://66.97.34.155:3000/api/manifest";
    config.modResults.EXUpdatesCodeSigningMetadata = {
      keyid: "main",
      alg: "rsa-v1_5-sha256",
    };
    config.modResults.EXUpdatesCheckOnLaunch = "ALWAYS";
    config.modResults.EXUpdatesEnabled = true;
    config.modResults.EXUpdatesLaunchWaitMs = 30000;
    config.modResults.EXUpdatesRuntimeVersion = 1;

    return config;
  });

const customAndroidManifest = (config) => {
  const { manifest } = config.modResults;
  const application = manifest.application[0];
  // Agrega android:usesClearTextTraffic="true" al tag application
  application.$["android:usesCleartextTraffic"] = "true";

  // Agrega meta-data
  application["meta-data"] = [
    ...(application["meta-data"] || []),
    {
      $: {
        "android:name": "expo.modules.updates.CODE_SIGNING_CERTIFICATE",
        "android:value":
          "-----BEGIN CERTIFICATE-----\nMIICzTCCAbWgAwIBAgIJGnHf0osQEoc2MA0GCSqGSIb3DQEBCwUAMA8xDTALBgNV\nBAMTBHRlc3QwIBcNMjIwNDE0MTY1MjE3WhgPMjEyMjA0MTQxNjUyMTdaMA8xDTAL\nBgNVBAMTBHRlc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDS+Jol\nAnxgRGlsfS5zTajApxCH2+Zg8q/b/CMDNprvkT19eRL/CL41O84v4BQICJ1nQOFs\n+DwmMwoi0iLeoT3tz2wTeS/pC0lKusx8KiSZrVh3HImYmEahSF5qznNEUNyXO74q\nKBf+1wINNKK4igcqrKyrfCDus76fOZ374WUMPMZn9pxFv5kqovpgCQBhdJ9IqQTQ\nZpV1qoyHwMmA3fDDsNTdGc127lbVli96pTlOmIuoX7sUdYJlTVmMr5KIvZmh95Wz\nPOihh5O1V7TGy7Ybfm9+tSHkqosO2dg6YTEZOxMxAM+6rERTtdOkuO0tlmRdiqP5\n/2ze3k4dzDMcCTn/AgMBAAGjKjAoMA4GA1UdDwEB/wQEAwIHgDAWBgNVHSUBAf8E\nDDAKBggrBgEFBQcDAzANBgkqhkiG9w0BAQsFAAOCAQEAUjjv9YiWBtbFfheB+QTK\nepnwCOH87e+ZZeFgQ4zOa+XKISKQ5EPGqDXXusSn+vf6n0Xz9TIZa+f0afPfefZi\n6k3KbSxmZ9XiZGPdI2hTbo8VUCxuYvdSB8R/Y5Gpabt1Wpuub//HHcORfr04WPCz\nAyIseRunLzxcT9X9z55XdhsoTo4V8AnkihFgjB8pNMKb6yfSM8YtvXfNR4QCusoK\nbbzsc2bURI2v2z7G6w76sQBdKGswG2gC2HGxhlAXMSJvJZyvQMXP+RaiLRMvDxhr\nNL8e5Y4+/HH1/m1EiXW3jssglgwGTdXG+3yS3z/CR2+ZpH9DuGR3II8T5AL6cGOi\nZA==\n-----END CERTIFICATE-----\n",
      },
    },
    {
      $: {
        "android:name": "expo.modules.updates.ENABLED",
        "android:value": "true",
      },
      $: {
        "android:name": "expo.modules.updates.EXPO_UPDATE_URL",
        "android:value": "http://66.97.34.155:3000/api/manifest",
      },

      $: {
        "android:name": "expo.modules.updates.EXPO_RUNTIME_VERSION",
        "android:value": "1",
      },
      $: {
        "android:name": "expo.modules.updates.EXPO_UPDATES_CHECK_ON_LAUNCH",
        "android:value": "ALWAYS",
      },
      $: {
        "android:name": "expo.modules.updates.EXPO_UPDATES_LAUNCH_WAIT_MS",
        "android:value": "30000",
      },
    },
  ];
  return config;
};

module.exports = customAndroidManifest;
