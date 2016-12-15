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

# replace link to navigator-training-courses.zip 
# with link to Github folder, since zip is too big to stash on Github repo
sed -i "" \
  's%../navigator-training-courses.zip%https://github.com/wgetsnaps/marketplace.cms.gov/tree/master/technical-assistance-resources/navigator-training-courses%' \
  technical-assistance-resources/training-materials/training.html

~~~


See the log: [wget.log](wget.log)
