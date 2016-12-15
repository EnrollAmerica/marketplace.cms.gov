# marketplace.cms.gov


Website (and associated PDFs and other documents) as found on the Health Insurance Marketplace, via CMS: https://marketplace.cms.gov/

Mirror:
http://wgetsnaps.github.io/marketplace.cms.gov/


wget invocation:

~~~sh
wget --mirror \
  --adjust-extension \
  --backup-converted  \
  --convert-links \
  --no-host-directories \
  --output-file /dev/stdout \
  https://marketplace.cms.gov \
| tee ./wget.log
~~~


See the log: [wget.log](wget.log)
