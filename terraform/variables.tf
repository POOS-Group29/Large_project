variable "aws_region" {
  default     = "us-east-1"
  description = "The AWS region to deploy to"
}

variable "app_prefix" {
  default     = "cop4331"
  description = "Common prefix for all Terraform created resources"
}

variable "mongo_url" {
  description = "The URL for the MongoDB database"
}
