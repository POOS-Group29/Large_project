resource "aws_lb" "cop4331-express-alb" {
  name                       = "${var.app_prefix}-express-alb"
  internal                   = false
  load_balancer_type         = "application"
  security_groups            = [aws_security_group.allow_all.id]
  subnets                    = var.public_subnet_ids
  enable_deletion_protection = false
  enable_http2               = true
  idle_timeout               = 60
  tags = {
    Name = "${var.app_prefix}-express-alb"
  }
}

resource "aws_lb_target_group" "cop4331-express-tg-dev" {
  name        = "${var.app_prefix}-express-tg-dev"
  port        = 80
  protocol    = "HTTP"
  target_type = "lambda"
  vpc_id      = var.vpc_id

  tags = {
    Name = "${var.app_prefix}-express-tg-dev"
  }
}

resource "aws_lb_target_group" "cop4331-express-tg-prod" {
  name        = "${var.app_prefix}-express-tg-prod"
  port        = 80
  protocol    = "HTTP"
  target_type = "lambda"
  vpc_id      = var.vpc_id

  tags = {
    Name = "${var.app_prefix}-express-tg-prod"
  }
}

resource "aws_lb_listener" "cop4331-express-listener-https" {
  load_balancer_arn = aws_lb.cop4331-express-alb.arn
  port              = "443"
  protocol          = "HTTPS"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.cop4331-express-tg-prod.arn
  }

  ssl_policy      = "ELBSecurityPolicy-2016-08"
  certificate_arn = var.certificate_arn

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_lb_listener" "cop4331-express-listener-http" {
  load_balancer_arn = aws_lb.cop4331-express-alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_target_group_attachment" "cop4331-express-tg-attachment-dev" {
  target_group_arn = aws_lb_target_group.cop4331-express-tg-dev.arn
  target_id        = aws_lambda_function.cop4331-express-lambda-dev.arn
}

resource "aws_lb_listener_rule" "cop4331-express-listener-rule-dev" {
  listener_arn = aws_lb_listener.cop4331-express-listener-https.arn
  priority     = 200

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.cop4331-express-tg-dev.arn
  }

  condition {
    http_header {
      http_header_name = "Environment"
      values           = ["dev"]
    }
  }
}

resource "aws_lambda_permission" "cop4331-express-lambda-permission-dev" {
  statement_id  = "AllowExecutionFromlb"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.cop4331-express-lambda-dev.arn
  principal     = "elasticloadbalancing.amazonaws.com"
  source_arn    = aws_lb_target_group.cop4331-express-tg-dev.arn
}

resource "aws_lb_target_group_attachment" "cop4331-express-tg-attachment-prod" {
  target_group_arn = aws_lb_target_group.cop4331-express-tg-prod.arn
  target_id        = aws_lambda_function.cop4331-express-lambda.arn
}

resource "aws_lambda_permission" "cop4331-express-lambda-permission-prod" {
  statement_id  = "AllowExecutionFromlb"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.cop4331-express-lambda.arn
  principal     = "elasticloadbalancing.amazonaws.com"
  source_arn    = aws_lb_target_group.cop4331-express-tg-prod.arn
}

resource "aws_lb_listener_rule" "cop4331-express-listener-rule-prod" {
  listener_arn = aws_lb_listener.cop4331-express-listener-https.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.cop4331-express-tg-prod.arn
  }

  condition {
    http_header {
      http_header_name = "Environment"
      values           = ["prod"]
    }
  }
}
