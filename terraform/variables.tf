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
