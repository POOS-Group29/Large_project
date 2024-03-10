resource "aws_cloudwatch_log_group" "lambda_dev" {
  name              = "/aws/lambda/${aws_lambda_function.cop4331-express-lambda-dev.function_name}"
  retention_in_days = 1
}

resource "aws_cloudwatch_log_group" "lambda_prod" {
  name              = "/aws/lambda/${aws_lambda_function.cop4331-express-lambda.function_name}"
  retention_in_days = 1
}
