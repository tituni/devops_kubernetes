#!/usr/bin/env bash
set -e

if [ $URL ]
then
  pg_dump -v $URL > /usr/src/app/backup.sql

  echo "Not sending the dump actually anywhere"
  # curl -F ‘data=@/usr/src/app/backup.sql’ https://somewhere
  # curl -X POST -H "Authorization: Bearer $(gcloud auth print-access-token)" -o "data=@/usr/src/app/backup.sql" "https://storage.googleapis.com/storage/v1/b/tituni-pg-backup/o/backup.sql"
  # curl -X POST --data-binary "@/usr/src/app/backup.sql" -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/sql" "https://storage.googleapis.com"
  # curl -X POST --data-binary "@readme.md" -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: text/plain" "https://storage.googleapis.com/storage/v1/b/tituni-pg-backup/o/readme.md"

fi