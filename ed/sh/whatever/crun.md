crun
-

`crontab -e`
````sh
cat /etc/cron.d/

# dir with cron jobs
ls /etc/cron.d
````

````sh
SHELL=/bin/bash
PATH=/bin:/usr/bin:/usr/local/bin
CRUN_REMOTE_HOST=Host
CRUN_EMAIL=mail@com.com
CRUN_WORK_DIR=/var/www/vhosts/host/htdocs

* * * * *
│ │ │ │ │
│ │ │ │ day (of week)
│ │ │ month
│ │ day (of month)
│ hour
minute

0 0 * * 5   # every Friday
*/3 * * * * # every 3rd minute

0 * * * * /bin/echo `date` >> /tmp/d.tmp

# crun lock file. Should be removed when execution fails...
rm /tmp/crun_user_at_server_or_host_3a30db060f74d9390a2eb6f8a92eab8d

grep cron -i /var/log/syslog
tail -f /var/log/syslog | grep cron -i
````

````sh
# restart on centos
sudo service crond restart
````
