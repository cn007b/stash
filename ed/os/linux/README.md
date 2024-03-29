Linux
-

Since 1991.

````sh
shutdown -r now

sudo dpkg -i {name}

uname -a # Shows 32 or 64 bit OS.
uname -r # Show the kernel version.
cat /etc/*release # all ablut os
````

On Linux systems, a kernel configuration parameter called `net.core.somaxconn`
provides an upper limit on the value of the backlog parameter passed to the listen function
that is used to create the servers listening socket.
If the backlog argument is greater than the value in /proc/sys/net/core/somaxconn,
then it is silently truncated to that value.
The default value in this file is 128.

Linux kernel generates entropy from keyboard timings, mouse movements, and else into
`/dev/random, /dev/urandom`.

The `SysV init` is a standard process used by Red Hat Linux to control
which software the init command launches or shuts off on a given runlevel.

````sh
/                                       # root
/bin                                    #
/bin/true                               # returns 0 code
/dev/null                               # stream, hide output
/dev/random                             # random data for entropy
/dev/stderr                             # stream 2
/dev/stdin                              # stream 0
/dev/stdout                             # stream 1
/dev/tty                                # representing the terminal for the current process
/dev/urandom                            # random data for entropy
/etc                                    # system configuration directory
/etc/defaults/grub                      #
/etc/group                              # user's groups
/etc/hostname                           #
/etc/nologin                            # create this file, so noone can login to machine
/etc/os-release                         # about linux
/etc/pam.d/common-session               #
/etc/pam.d/common-session-noniteractive #
/etc/passwd                             #
/etc/resolv.conf                        # for networking
/etc/security/limits.conf               # limits per user
/etc/shadow                             # file with passwords
/etc/sudoers                            #
/etc/sysctl.conf                        #
/etc/ttys                               # logged in users
/home                                   #
/lib                                    #
/media                                  #
/opt                                    # optional software directory
/proc                                   # mount point for procfs (this directory holds OS state)
/proc/$pid/                             # process related stuff
/proc/$pid/cmdline                      # process full command line
/proc/$pid/cwd                          # cwd for process
/proc/$pid/environ                      # env vars for process
/proc/$pid/fd                           # open file descriptors
/proc/$pid/fd/0                         # process stdin
/proc/$pid/fd/1                         # process stdout
/proc/$pid/fd/2                         # process stderr
/proc/$pid/fd/2                         # process stderr
/proc/$pid/mem                          # virtual memory for process
/proc/$pid/root                         # root for process
/proc/$pid/smaps                        #
/proc/$pid/statm                        # mem stats about process
/proc/$pid/status                       # status about process
/proc/cpuinfo                           # info about cpu
/proc/malloc                            #
/proc/meminfo                           # info about memory (+ memory usage)
/proc/net                               # network
/proc/net/ip_vs                         #
/proc/stat                              # system stats
/proc/sys/fs/file-max                   # contains open file limit
/proc/sys/kernel                        # kernel parameters
/proc/sys/kernel/random/entropy_avail   # entropy pool size
/proc/sys/net/core/somaxconn            #
/proc/sys/net/ipv4/tcp_keepalive_time   # current tcp_keepalive_time value
/proc/version                           # kernel version
/proc/zoneinfo                          # info about virtual memory zones
/run                                    # runtime info
/sys                                    # kernel & hardware objects
/sys/devices/system/cpu/cpu[0-7]        #
/usr                                    # Unix System Resources
/usr/bin                                #
/usr/lib                                #
/usr/lib/pkgconfig                      # dir for pkgconfig files
/usr/local/bin                          #
/usr/share/pkgconfig                    # dir for pkgconfig files
/usr/share/zoneinfo                     #
/var                                    #
/var/log                                #
/var/log/wtmp                           # contains recent logins
````

````sh
cat /proc/sys/net/core/somaxconn
sysctl -n net.core.somaxconn
# on server must be at least 1024
````

````sh
cat /etc/passwd
sar:x:205:105:Stephen Rago:/home/sar:/bin/ksh

colon-separated fields:
sar          - the login name,
x            - encrypted password,
205          - numeric user ID
105          - numeric group ID
Stephen Rago - a comment field
/home/sar    - home directory
/bin/ksh     - and shell program
````

Number of Open Files Limit:
````sh
/proc/sys/fs/file-max                       # contains open file limit
ulimit -Hn                                  # hard limit
ulimit -Sn                                  # soft limit
sysctl -w fs.file-max=500000                # set files limit (will lost after reboot)
echo fs.file-max=500000 >> /etc/sysctl.conf # permanent conf
/etc/security/limits.conf                   # limits per user
````

Each directory contains subdirectories `.` and `..`.
<br>`.` refers to the current directory,
<br>`..` refers to the parent directory,
