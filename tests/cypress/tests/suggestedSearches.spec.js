/** *****************************************************************************
 * Licensed Materials - Property of Red Hat, Inc.
 * Copyright (c) 2021 Red Hat, Inc.
 ****************************************************************************** */

/// <reference types="cypress" />

import { squad } from '../config'
import { searchPage } from '../views/search'
import { savedSearches, searchBar } from '../views/suggestedSearches'

describe('RHACM4K-411: Search: Verify the suggested search templates', function() {
  before(function() {
    cy.login()
  })

  beforeEach(function() {
    searchPage.whenGoToSearchPage()
  })

  it(`[P3][Sev3][${squad}] should see the workloads template & search tag in search items`, function() {
    savedSearches.whenSelectCardWithTitle('Workloads')
    searchBar.shouldContainTag('kind:daemonset,deployment,job,statefulset,replicaset')
  });

  it(`[P3][Sev3][${squad}] should see the unhealthy pods template & search tag in search items`, function() {
    savedSearches.whenSelectCardWithTitle('Unhealthy pods')
    searchBar.shouldContainTag('kind:pod')
    searchBar.shouldContainTag('status:Pending,Error,Failed,Terminating,ImagePullBackOff,CrashLoopBackOff,RunContainerError,ContainerCreating')
  });

  it(`[P3][Sev3][${squad}] should see the created last hour template & search tag in search items`, function() {
    savedSearches.whenSelectCardWithTitle('Created last hour')
    searchBar.shouldContainTag('created:hour')
  });
})
