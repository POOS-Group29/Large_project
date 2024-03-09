data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "lambda_role" {
  name               = "lambda_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

data "archive_file" "lambda" {
  type        = "zip"
  source_file = "server.js"
  output_path = "lambda.zip"
}


resource "aws_lambda_function" "cop4331-express-lambda" {
  function_name = "${var.app_prefix}-express-lambda"
  handler       = "server.handler"
  runtime       = "nodejs18.x"
  role          = aws_iam_role.lambda_role.arn
  timeout       = 60
  memory_size   = 128
  filename      = "lambda.zip"

  environment {
    variables = {
      NODE_ENV   = "production",
      AWS_LAMBDA = "true",
      MONGO_URL  = var.mongo_url
    }
  }

  lifecycle {
    ignore_changes = ["filename"]
  }
}
