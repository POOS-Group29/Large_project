terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.52.0"
    }
  }
  required_version = ">= 1.1.0"

  cloud {
    organization = "cop4331"

    workspaces {
      name = "cop4331-express-lambda"
    }
  }
}

provider "aws" {
  region = var.aws_region
}
