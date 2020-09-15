/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as yargs from 'yargs';
import { bundleBuddyPr } from './bundleBuddyPr';
import { bundleBuddyUpdatePendingPrs } from './bundleBuddyUpdatePendingPrs';

function bundleBuddyCli() {
  yargs
    .strict()
    .version(false)
    .command(
      'pr',
      'Run bundle buddy in the context of a PR build',
      (yargs) =>
        yargs
          .option('adoToken', {
            describe: 'An access token to use Azure DevOps Apis',
            type: 'string',
            demandOption: true
          })
          .option('bundleReportPath', {
            descripe: 'The path where the bundle reports generated by this build are located',
            type: 'string',
            demand: true
          })
          .option('adoBuildId', {
            describe: 'The current build id in Azure devops',
            type: 'number',
            demand: true
          })
          .option('adoPrId', {
            describe: 'The current pull request id in Azure devops',
            type: 'number',
            demand: true
          }),
      async (argv) => await bundleBuddyPr(argv.adoToken, argv.bundleReportPath, argv.adoBuildId, argv.adoPrId)
    )
    .command(
      'updatePendingPrs',
      'Updates all pending PRs when a new baseline is available',
      (yargs) =>
        yargs
          .option('adoToken', {
            describe: 'An access token to use Azure DevOps Apis',
            type: 'string',
            demandOption: true
          })
          .option('baselineCommitHash', {
            describe: 'The git commit hash being used as the baseline build',
            type: 'string',
            demand: true
          })
          .option('baselineBundleReportPath', {
            descripe: 'The path where the bundle reports for the baseline are located',
            type: 'string',
            demand: true
          }),
      async (argv) =>
        await bundleBuddyUpdatePendingPrs(argv.adoToken, argv.baselineCommitHash, argv.baselineBundleReportPath)
    )
    .demandCommand().argv;
}

bundleBuddyCli();