Linux Tools
-

````sh
shutdown -h now

env # prints all ENV vars

alias # show all aliases
alias la='ls -A'

type la # show alias
type cp
type /Users/k/web/kovpak/gh/ed/bash/examples/hw.sh

which git # /usr/local/bin/git

ldd /bin/ls # shows used *.so libraries by ls command

sleep 6 &
jobs # will shows scrips in background

fg # send command to foreground
bg # send command to background

hostname
tty
who

echo 1 || : # echo 1 or do nothing

# SSH tunnel.
# Remote server just needs to have python available.
# usr@ec2-us-east-1.smth.com - remote host.
# 10.3.0.0/16 - network interface to connect to.
sshuttle -v -r usr@ec2-us-east-1.smth.com 10.3.0.0/16

ping 8.8.8.8 -c 15
traceroute http://cn007b.tumblr.com # print the route packets take to network host
nslookup git.mdm.comodo.od.ua
host github.com # Shows ip by host.
dig domain
whois ip
nmap --script=http-headers www.zii.com # scan ports

timedatectl status | grep "Time zone"
colordiff -u file1 file2

# Soft link - is an actual link to the original file.
# Hard link - is a mirror copy of the original file.
# If delete original file:
# soft link has no value, because it points to non-existent file,
# but the hard link will still has the data of the original file.
# If create hard link and change the content of either of the files - the change will be seen on both!
ln -s {file} {symbolic-name} # symbolic (or soft) link
ln {file} {hard-name}        # hard link

echo 200 | pbcopy                              # copy data into clipboard buffer
file ed/bash/README.md                         # prints file type
fswatch ./src | while read f; do echo $f; done # watch changes in directory
mkdir -m 777 test                              # directory mode
mkfifo mypipe                                  # create named pipe
ss                                             # tool for sockets
strace pwd                                     # to see what program `pwd` is doing
uuid -n 1                                      # generates uuid

nc -zv 10.0.2.2 22
nc -zv 78.140.186.238 1-65535
nc -zv 10.0.2.2 22

Public DNS IP addresses:
8.8.8.8
8.8.4.4

# osx proxy
sudo networksetup -setwebproxy "Wi-Fi" 54.174.16.166 80
# '71.4.186.100:21288', '198.7.96.243:21239', '104.128.17.224:21237', '209.48.175.196:21325', '172.102.207.55:21279', '198.7.97.209:21297', '162.248.134.54:21326', '23.239.219.244:21325', '143.191.19.7:21238', '173.44.12.201:21259', '173.44.5.52:21310', '173.44.12.68:21305', '173.44.26.80:21269', '107.152.144.66:21291', '208.73.73.206:21257', '204.14.87.85:21326', '144.168.128.88:21244', '204.14.87.149:21271', '45.57.195.33:21232', '173.44.5.185:21247', '173.44.12.141:21280', '173.44.26.220:21318', '107.152.144.219:21274', '208.73.73.9:21278', '143.191.19.89:21263', '143.191.31.123:21304', '69.174.99.149:21322', '50.117.15.33:21318', '173.44.12.16:21297', '216.172.144.220:21285',
sudo networksetup -setwebproxystate "Wi-Fi" off

# base64
stringInBase64=`echo "shaken not stirred" | base64`
echo $stringInBase64 | base64 -D

# nohup
# When you execute a job in the background (using &, bg command),
# and logout from the session - your process will get killed,
# to prevent this run:
nohup myscript &
# to run with low priority:
nice myscript
nohup nice myscript &

# http stress tester
siege -c 10 -t 1m -b http://mysite.dev

# xml
echo '<?xml version="1.0" encoding="UTF-8"?><note><f>foo</f><b>bar</b></note>' | xmllint --format -

# send message to user k
write k

for f in x*; do
  echo -e "\t [f]: $f"
done
````

#### cut

````sh
cut -f7 -d: /etc/passwd
cut -d' ' -f2 /tmp/file.txt # print column 2 from file using ' ' as delimer
cut -c1,2                   # column 1,2
cut -c 1-5                  # from 1 to 5 columns
cut -c13-                   # from 13 char to the end of string
````

#### tr

````sh
echo b1nd | tr 1 o               # bond # replace 1 to o
echo b1nd | tr -d [0-9]          # result: bnd
echo 'abc' | tr -d 'b'           # ac
echo '(x)' | tr '()' '[]'        # result: [x]
echo 'hello   world' | tr -s ' ' # result: hello world
tr -d '[:punct:]'                # punctuations: !@#$%^&*()_-+={}[];:'"`/>?.,<~|\
````

#### monitoring

````sh
dmesg | tail      # last 10 system messages
vmstat 1          # virtual memory stat
mpstat -P ALL 1   # CPU time breakdowns per CPU
pidstat 1         # top’s per-process summary
iostat -xz 1      # block devices (disks)
free -m           # block device I/O buffer cache & file systems page cache
sar -n DEV 1      # check network interface
sar -n TCP,ETCP 1 # TCP metrics
top               #

uptime # CPU load average
````

````sh
# tool to disable redundant background services on machine
sysv-rc-conf

# CPU usage info
# apt-get install sysstat
mpstat

# Memory usage info
free
free -h
cat /proc/meminfo

# Disc usage info
iotop

# tool for net traffic
cbm

# general stat
dstat

# shows OS limits
ulimit -a

sysctl -a
````

#### uniq

````sh
printf "a\n1\n2\n2\n2\n3\n" | uniq
printf "a\n1\n2\n2\n2\n3\n" | uniq -c # count
printf "a\n1\n2\n2\n2\n3\n" | uniq -d # only repeated
printf "a\n1\n2\n2\n2\n3\n" | uniq -u # not repeated
````

#### paste

````sh
paste file1 file2                    # use file1 as column1, file2 - as column2
paste -d';'                          # delimer
paste -s                             #
printf "a\nb\nc\n" | paste -d_ - - - # result: a_b_c
````

#### printf

````sh
printf "new line \n and \t tab \n"
printf %s\\n 'msg'
printf "Hi %s \n" $USER
printf "line-%s\n" 1 2 3
printf %d\\n {0..2} # range
printf "%s\n" *.{gif,jpg,png} # list
printf -v v "UserIs: %s" $USER; echo $v # save into var
````

#### echo

````sh
echo 'Hello world'
echo '$myVar' # not evaluate vars
echo "$myVar" # evaluate
echo "Hello world $USER"
echo -n "Hello world $USER" # no new line
echo {a..d} # range
echo {a..c}{1..2}
echo -={a,b,c}=- # -=a=- -=b=- -=c=-
echo n#{1..3}, # n#1, n#2, n#3,echo $(date)
echo $USER
echo $RANDOM
echo $UID

````

#### disk usage

````sh
df               # Show information about the file system.
df -h            # all drives
lsblk            # all attached drives
df -T            # Show filesystem type
du               # Summarize disk usage of each FILE.
du -sh IraFoto/* # Summarize disk usage of each dir in foto dir.
````

#### openssl

````sh
# HTTPS keys:
openssl genrsa 1024 > private.key
openssl req -new -key private.key -out cert.csr
openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem
````

````sh
# https request
r="GET / HTTP/1.1
Host: localhost:4433
"
echo $r | openssl s_client -ign_eof -connect localhost:4433
````

#### nc

````sh
# listen
nc -l 64738
curl localhost:64738

# request
r="GET / HTTP/1.1
Host: localhost:8080
"
echo $r | nc localhost 8080
````

#### telnet

````sh
telnet localhost 8080
GET / HTTP/1.1
Host: localhost:8080

telnet -e ! localhost 8080

# php-fpm
telnet localhost 9000

# websocket
telnet 0.0.0.0 12345
````

````sh
open localhost 8080
````

#### syslog

````sh
ls /var/log/syslog

vim /etc/rsyslog.conf
logrotate --version

# conf
vim /etc/logrotate.conf
# additional config
vim /etc/logrotate.d/rsyslog
````

Config:
````sh
/var/log/syslog
{
  rotate 7      # 7 rotations
  daily         # rotation every day
  missingok     # if log file is missing - go on to the next one without issuing an error
  notifempty    # do not rotate the log if it's empty
  delaycompress # postpone compression previous log file to the next rotation cycle
  compress      # gzip
  postrotate
    /usr/lib/rsyslog/rsyslog-rotate
  endscript
}
````

#### balance

balance - simple load balancer.

````sh
balance -d -f 9000 127.0.0.1:900{1,2,3} &
curl localhost:9000
````

#### tail

````sh
echo -e "1 \n2 \n3 \n4 \n5" | tail -2 # 4, 5 # last 2 lines
echo -e "1 \n2 \n3 \n4 \n5" | tail -n 2 # 4, 5
echo -e "1 \n2 \n3 \n4 \n5" | tail -n +3 # 3, 4 ,5 # start from top from line 3

# slice file into 2 pieces:
head -3 file > slice1
tail -n +4 file > tmp; cat tmp > file; rm tmp
````

#### kill

````sh
pkill /var/www/x.php # Kill runned script x.php.
pkill -f php         # Kill runned script with name like php.
pkill -f test.py     # Full argument lists, default is to match against process names.

kill -9 `ps -aux|grep {{PROCESS_NAME}}|grep -v grep|awk '{print $2}'`

kill -s HUP $pId # HUP signal
````

Signals:

````sh
SIGSEGV # segmentation violation (fault) - the software has attempted to access a restricted area of memory
SIGHUP  # hangup - sent to process running in console once you log out (nohup somescript)
SIGINT  # interrupt from keyboard
SIGTERM # default kill signal
SIGKILL # kill
SIGSTOP # stop process
SIGCONT # continue stopped process
````

#### date

````sh
# date, in certain format:
date +'%b %d %H:%M:%S' # Apr 24 13:38:17
                       # May 02 11:25:32
date +'%b %e %H:%M:%S' # May  2 11:41:07
date +'%d/%b/%Y:%H:%M' # 18/Jul/2018:11:48
date +%Y-%m-%dT%T%z    # 2018-07-18T11:49:03+0300
date +%s               # timestamp
date +%s%N             # seconds and current nanoseconds
date --date '-10 min'

d='2019-03-14T20:38:04.914292Z'
t=`date -d $d +%s` # to timestamp
date -r $t         # to date
````

#### ls

````sh
ls -a              # all
   -A              # except for . and ..
   -h              # sizes
   -i, --inode     #
   -L              # dereference links
   -l              # long listing format
   -R, --recursive #
   -s              # number of file system blocks
   -v              # natural sort
````

#### find

````sh
# delete all -name directories
find . -type d -name node_modules -exec rm -rf {} \;
find . -type d -name vendor -exec rm -rf {} \;

# md5 for directory
find src/ -type f -exec md5sum '{}' \; | md5sum

find -type f -mtime -20 | while read file; do modif=`git log -1 --format="%cd" $file`; echo "$modif - $file"; done
# Shows file types that present in foolder
find . -type f | perl -ne 'print $1 if m/\.([^.\/]+)$/' | sort -u

time find -name '*.php' -mtime -1 | xargs -l php -l | grep -v 'No syntax errors detected in'
find ./ | grep '.php' | xargs -l php -l | pv | grep -v 'No syntax errors detected in'
# skype Vdovin
cat /tmp/alcuda_tech.log | grep -Eo --color=never '^\[\S+\s+[^\*][^:]+' | sed -r 's/^\S+\s+//g' | sort | uniq -c | sort -nr | head -30
find -type f -name '*.php' -exec egrep -l 'class\s+ProfileManager' {} \;
find -name '*.htm' -exec touch {} \;
find -type f -name '*.php' -exec egrep -Hn --color=always 'is_failed' {} \; | grep profile
````

#### sort

````sh
sort -u   # unique
sort -r   # reverse
sort -nk2 # sort as numbers by column 2
````

#### read

Reads user input (prompt).

````sh
# reads and prints input
read; echo $REPLY
read -r; echo $REPLY

# reads 1 character
read -r -n 1; echo $REPLY

printf "1\n2\n3\n" | while read line; do echo "got line: ${line}"; done
````

#### apachebench

````sh
ab -k -n 5000 -c 100 -t 2 "http://localhost"
# Where:
# -n   Number of requests.
# -c   Concurrency.
# -t   Timelimit in seconds.
````

docker run -ti --rm cn007b/ubuntu ab -k -n 100 -c 100 -t 5 "http://10.254.254.254:8080/9"

#### upstart

Is an event-based replacement for the traditional init daemon.

#### netstat

netstat works greedy to OS resources,
so it makes sense to use `ss` tool.

````sh
# ports
netstat -anp | grep LISTEN # ⚠️
ss -an | grep 80 # ✅

# osx
sudo lsof -i -n -P | grep TCP
sudo lsof -i -n -P | grep TCP.*80

# Active Internet connections
netstat -tpne

netstat -an
````

#### mount

Run `mount` command to see types of mounted filesystems.

On server machine:
````
echo '/tmp 52.48.208.239(rw,sync,no_subtree_check,no_root_squash)' >> /etc/exports
````

On client machine:
````
mount -t nfs {remote_machine_ip}:/remote/dir /local/dir
````

#### screen

````sh
screen -S sessionName # new named session
screen -ls            # list of active sessions
screen -x sessionName # attach to session
````
Ctrl+A followed by D = detach screen

#### image

````sh
# print screen from url
cutycapt --url=cn007b.tumblr.com --out=out.png
wkhtmltoimage cn007b.tumblr.com i.jpg
webkit-image-gtk http://cn007b.tumblr.com > i.png
````

#### image optimization

````sh
jpegoptim --size=12k --dest a/ -o origin.jpg
jpegoptim --max=30 --dest=res -o  bond.origin.jpg

convert origin.jpg -quality 95 result.jpg
convert origin.jpg -resize 100 result.jpg
convert origin.jpg -resize 50% result.jpg
convert bond.origin.jpg -resize 200x150 bond.res.jpg

jpegtran -copy none -optimize -outfile res.jpg origin.jpg

pngquant --force --quality=25-25 ~/Downloads/origin.png --ext .25.png

# resize image to particular size.
mogrify -resize 400x400! src.png
````

#### rsync

````sh
rsync -az --progress /source /target
rsync -az --progress --exclude=.git/* --rsh='ssh -p26' kovpak@trunk-web-php.pmmedia.priv:/usr/share/yii/ /home/volodymyr/web/kovpak/yii/framework/
rsync -az --progress --rsh='ssh -i /home/kovpak/web/storage/zii.pem' ./ ec2-user@ec2-52-210-246-232.eu-west-1.compute.amazonaws.com:/var/www/
````

#### sed

Sed was developed from 1973.

````sh
# Mode of operation
d - delete
q - quit
N - add the next line

echo 'Some text or regexp' | sed 's/regexp/replacement/g' # Some text or replacement
echo 'cat and dog' | sed -r "s/(cat|dog)s?/\1s/g" # cats and dogs
echo 'xxx and zzz' | sed 's/x/y/g' # yyy and zzz
echo '1 one; 2 two' | sed 's/1//g; s/2//g' #  one;  two

echo "Version: 4.4.0.157.165" | sed -E 's/.*Version: ([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)\.[0-9]+/\1/'

sed -i "s/admin_user/user/" /var/www/html/config.php

echo 'car mAn' | sed -e 's/a/{&}/ig'

# delete 2nd line from file
sed -e '2d;' file.txt > res.file.txt

echo A_B_C_D_E_F_20180904_0038849_SUPER03.txt \
  |sed -e 's/_[0-9]\{8\}_[0-9]\{7\}_[A-Z0-9]*//g'

# execute
echo "1" > /tmp/x; echo "2" >> /tmp/x
sed ' s/^/echo -n /e ' /tmp/x
````

#### awk

AWK was created in the 1970s.

````sh
-F ':' # column separator

echo 'one and two' | awk '{print $1}'                     # will print one
echo 'one,two,three' | awk -F ',' '{print $1"-"$2}'       # csv: one-two
awk 'BEGIN {print "Hello, world!"}'                       #
ps aux | awk 'length($0) > 150'                           # Print lines longer than 150 characters
printf "one\n* two\n" | awk '{print ($1=="*" ? $2 : $1)}' # Print one \n two
printf "1\n 2\n 3\n" | awk 'ORS=NR?",":"\n"'              # Replace new line with comma
printf "1\n2\n3\n" | awk '{print}'                        #
printf "1\n2\n3\n" | awk '/2/{print}'                     # match pattern
printf "1\n2\n3\n" | awk '{if($1 ~/3/) print}'            # if
printf "1 a\n2\n" | awk '{if ($2 == "") print $1, "*"}'   #

printf "A 25 27\nB 75 78\nC 97 93" | \
  awk '{avg=($2+$3)/2; printf "%s -> (avg=%s) %s \n", $0, avg, (avg<50)?"FAIL":(avg<80)?"B":"A"}'
````

#### ftp

````sh
ftp $hostname

# connect in passive mode
ftp -p $hostname

ncftpput -R -v -u {user} {host} remote_path ./local_path/*
````

````sh
status
system          # show remote system type
ascii           # set ascii transfer type
binary          # set Binary transfer type
dir             # list contents of remote directory
ls              # list contents of remote directory

size filename
get filename    # receive file
recv filename   # receive file
delete filename

bye             # exit
close
````

#### watch

execute a program periodically, showing output fullscreen.

````
-n, --interval <secs> # seconds to wait between updates
````

watch -n 1 'echo $(date +%s%N)'
watch -n .01 'echo $(date +%s%N)'
watch -n 2 'date'

#### ps

````sh
ps ax                             # Display all processess
ps aux                            # Detailed information about processess
ps -f -u www-data                 # Display process by user "www-data"
ps -C apache2 u                   # Show process by name
ps -f -p 1400                     # Show process by id
ps aux --sort=-pcpu,+pmem         # Sort process by cpu or memory usage ("-" or "+" symbol indicating descending or ascending sort)
ps -f --forest -C apache2         # Display process hierarchy in a tree style
ps -o pid,uname,comm -C apache2   # Display child processes of a parent process
ps -p 3150 -L                     # Display threads of a process
ps -e -o pid,uname,pcpu,pmem,comm # Change the columns to display
ps -e -o pid,uname=USERNAME,pcpu=CPU_USAGE,pmem,comm
ps -e -o pid,comm,etime           # Display elapsed time of processes

watch -n 1 'ps -e -o pid,uname,cmd,pmem,pcpu --sort=-pmem,-pcpu | head -15' # Turn ps into an realtime process viewer
````

#### chmod & useradd

````sh
visudo
su rob

-rwxrwxrwx
drwxr-xr-x # directory user group other
lrwxrwxrwx # link user group other

r (4) - read;
w (2) - write;
x (1) - execute;

Example:
u   g   o
7   5   3
rwx r-x -wx

chmod u-rx,g+x,o+w fileName

On server:
directory - drwxrwxr-x (775)
socket    - srw-rw---- (660)
file      - -rw-rw-r-- (664)
````
````sh
chown mysql:mysql mysql-files-dir
chmod 750 mysql-files-dir

chown -R www-data:www-data /var/www/html/

sudo chown -R `whoami` /var/log/

stat dir # shows permissions

# files permissions works regardless dir (in which file situated) permissions.
# use `sticky bit` for file to follow dir permissions:
chmod o+t /dir # now files in dir have permissions same as dir's.

# when permission denied
echo '127.0.0.1 trick' | sudo tee -a /etc/hosts
````

````sh
useradd
useradd -g $groupId
useradd -m # create home directory for user
useradd -m -g xgroup James
id $userName # info about user

adduser -D -g '' appuser # create new os user
````

#### mail

````
mail -s 'subject' mail@com.com < fileName
uuencode card.jpg card.jpg | mail mail@com.com
````

#### grep (Global Regular Expression Print)

````sh
-z, --null-data             # \0
-v, --revert-match          #
-m, --max-count=ЧИСЛО       #
-h, --no-filename           #
-L, --files-without-match   # print only file names
-Pz                         # multi rows
````

`grep match -wrni --color=always --include=*.php . | grep notMatch -v --color=always`