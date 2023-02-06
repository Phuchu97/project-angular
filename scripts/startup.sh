#!/bin/sh
echo "Replacing API URL to ${API_URL}"
sed -i "s#\"apiUrl\": .*#\"apiUrl\": \"${API_URL}\",#g" /usr/share/nginx/html/assets/app-config.json

echo "Replacing API URL Storage to ${API_URL_COMMON}"
sed -i "s#\"apiCommonUrl\": .*#\"apiCommonUrl\": \"${API_URL_COMMON}\",#g" /usr/share/nginx/html/assets/app-config.json

echo "Replacing API URL Storage to ${API_URL_SHOP}"
sed -i "s#\"webShopAdmin\": .*#\"webShopAdmin\": \"${API_URL_SHOP}\"#g" /usr/share/nginx/html/assets/app-config.json


echo "Check app-config.json"
cat /usr/share/nginx/html/assets/app-config.json

echo "Start Nginx"
nginx -g 'daemon off;'
