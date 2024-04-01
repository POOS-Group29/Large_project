variable "aws_region" {
  default     = "us-east-1"
  description = "The AWS region to deploy to"
}

variable "app_prefix" {
  default     = "cop4331"
  description = "Common prefix for all Terraform created resources"
}

variable "vpc_id" {
  description = "The ID of the VPC to deploy into"
}

variable "public_subnet_ids" {
  description = "The IDs of the public subnets to deploy into"
  type        = list(string)
}

variable "mongo_url" {
  description = "The URL for the MongoDB database"
}

variable "certificate_arn" {
  description = "The ARN of the SSL certificate to use for the ALB"
}

variable "mailgun_api_key" {
  description = "The API key for the Mailgun service"
}

variable "mailgun_domain" {
  description = "The domain for the Mailgun service"
}

variable "frontend_base_url" {
  description = "The base URL for the frontend"
}