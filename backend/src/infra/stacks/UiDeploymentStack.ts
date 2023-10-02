import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { getSuffixFromStack } from "../Utils";
import { join } from "path";
import { existsSync } from "fs";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Distribution, OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";

export class UiDeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sufix = getSuffixFromStack(this);

    const uiDeploymentBucket = new Bucket(this, "uiDeploymentBucket", {
      bucketName: `space-finder-frontend-${sufix}`,
    });

    const uiDir = join(__dirname, "..", "..", "..", "..", "client", "dist");

    if (!existsSync(uiDir)) {
      console.warn("Ui directory not found" + uiDir);
      return;
    }

    new BucketDeployment(this, "SpacesFinderDeployment", {
      destinationBucket: uiDeploymentBucket,
      sources: [Source.asset(uiDir)],
    });

    const originIdentity = new OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );

    uiDeploymentBucket.grantRead(originIdentity);

    const distribution = new Distribution(this, "SpacesFinderDistribution", {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new S3Origin(uiDeploymentBucket, {
          originAccessIdentity: originIdentity,
        }),
      },
    });

    new CfnOutput(this, "SpaceFinderUiUrl", {
      value: distribution.distributionDomainName,
    });
  }
}
