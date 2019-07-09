# Commands

sam package --output-template-file packaged.yaml --s3-bucket sus-package-test
sam deploy --template-file packaged.yaml --stack-name sustainability --capabilities CAPABILITY_IAM --region us-east-1

aws cloudformation describe-stack-events --stack-name sustainability

aws s3 rm s3://sus-package-test --recursive
