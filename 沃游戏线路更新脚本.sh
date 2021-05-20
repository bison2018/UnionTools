echo 运行脚本前请先关闭软件在执行


cd /data/data/com.wireguard.android/files/
rm -rf wg.conf
wget http://106.52.213.232:8080/wg.conf
chmod -R 777 wg.conf
cat wg.conf
