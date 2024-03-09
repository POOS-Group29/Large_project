# lambda nodejs 20 server.handler
resource "aws_iam_role" "lambda_role" {
  name               = "${var.app_prefix}-lambda-role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
  EOF

  tags = {
    Name = "${var.app_prefix}-lambda-role"
  }
}


resource "aws_lambda_function" "cop4331-express-lambda" {
  function_name = "${var.app_prefix}-express-lambda"
  handler       = "server.handler"
  runtime       = "nodejs20.x"
  role          = aws_iam_role.lambda_role.arn
  timeout       = 60
  memory_size   = 128
  environment {
    variables = {
      NODE_ENV   = "production",
      AWS_LAMBDA = "true",
      MONGO_URL  = var.mongo_url
    }
  }
}
