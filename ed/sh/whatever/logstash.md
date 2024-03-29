Logstash
-

````sh
sudo service logstash configtest
````

## Config

Filters are applied in the order in which they appear in config.
````sh
# {"ua":{"os":"windows"}} in config it will be
[ua][os]
# for example
output {
  statsd {increment => "apache.%{[ua][os]}"}
}
````

Simple test:
````sh
/opt/logstash/bin/logstash -e 'input { stdin {} } output { stdout {} }'

````

Simple elasticsearch config:
````sh
input { file { path => "/tmp/logstash.txt" } } output { elasticsearch { hosts => ["localhost:9200"] } }
````
````sh
/opt/logstash/bin/logstash -f /etc/logstash/conf.d/my.conf
````

Nginx conf:
````sh
input { file { path => "/var/log/nginx/access.log" } } output { elasticsearch { hosts => ["localhost:9200"] index => "nginx" } }
````

FileBeat conf:
````sh
input {
    beats {
                port => "5043"
        }
}

filter {
    if [host] == "ip-172-31-30-171" {
        mutate {
            replace => [ "host", "stage-zii-web" ]
        }
    }
    if [host] == "ip-172-31-1-239" {
                mutate {
                        replace => [ "host", "stage-zii-admin" ]
                }
    }
    if [host] == "ip-172-31-15-204" {
                mutate {
                        replace => [ "host", "stage-cli" ]
                }
        }
}
output {
    if [source] == "/var/log/nginx/access.log" and [host] == "stage-zii-web" {
        elasticsearch { hosts => ["localhost:9201"] index => "stage_admin_nginx_access" }
    }
    if [source] == "/var/log/nginx/admin-error.log" and [host] == "stage-zii-web" {
                elasticsearch { hosts => ["localhost:9201"] index => "stage_admin_nginx_error" }
        }

        if [source] == "/var/log/nginx/access.log" and [host] == "stage-zii-admin" {
                elasticsearch { hosts => ["localhost:9201"] index => "stage_api_nginx_access" }
        }
        if [source] == "/var/log/nginx/admin-error.log" and [host] == "stage-zii-admin" {
                elasticsearch { hosts => ["localhost:9201"] index => "stage_admin_nginx_error" }
        }
    if [source] == "/var/log/nginx/api-error.log" and [host] == "stage-zii-admin" {
                elasticsearch { hosts => ["localhost:9201"] index => "stage_api_nginx_error" }
        }
    if [source] == "/var/log/email-worker.log" and [host] == "stage-cli" {
                elasticsearch { hosts => ["localhost:9201"] index => "stage_cli_email" }
        }
        if [source] == "/var/log/chat-worker.log" and [host] == "stage-cli" {
                elasticsearch { hosts => ["localhost:9201"] index => "stage_cli_chat" }
        }
        if [source] == "/var/log/notification-worker.log" and [host] == "stage-cli" {
                elasticsearch { hosts => ["localhost:9201"] index => "stage_cli_notification" }
        }
        if [source] == "/var/log/document-worker.log" and [host] == "stage-cli" {
                elasticsearch { hosts => ["localhost:9201"] index => "stage_cli_document" }
        }
        if [source] == "/var/log/pictureCompression-worker.log" and [host] == "stage-cli" {
                elasticsearch { hosts => ["localhost:9201"] index => "stage_cli_pictureCompression" }
        }
        if [source] == "/var/log/sproutVideo_delete-worker.log" and [host] == "stage-cli" {
                elasticsearch { hosts => ["localhost:9201"] index => "stage_cli_sproutVideo_delete" }
        }
        if [source] == "/var/log/sproutVideo_upload-worker.log" and [host] == "stage-cli" {
                elasticsearch { hosts => ["localhost:9201"] index => "stage_cli_sproutVideo_upload" }
        }

}
````
