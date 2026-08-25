---
title: 'The cache was lying to me'
description: 'Four hours chasing a bug that turned out to be a TTL I wrote myself.'
pubDate: 2025-11-14
tags: ['debugging', 'typescript']
---

The symptom: search results were correct on first load and subtly wrong on every
load after that. Not *broken* wrong — the results came back, ranked plausibly,
in the right shape. Just wrong enough that I kept assuming I'd mis-tuned the
scoring.

I spent most of an afternoon in the ranking code. It was fine.

## The actual problem

The cache key included the query string but not the filters. Two searches for
the same term with different filters resolved to the same entry, and whichever
one ran first won for the rest of the TTL window. Because I always tested the
unfiltered case first, the unfiltered results were what got cached, and every
subsequent filtered search returned them.

The fix was one line. The lesson was not.

## What I should have done sooner

I treated the cache as infrastructure rather than as code I'd written that
morning. Infrastructure gets a pass in the first hour of debugging — you assume
Postgres isn't the problem, you assume the runtime isn't the problem, and
usually you're right. But a cache layer I wrote three commits ago is not
infrastructure. It's the newest, least-tested thing in the request path, and it
should have been the *first* suspect, not the last.

The generalized version: when something behaves correctly once and incorrectly
afterward, suspect anything that holds state between requests. Order of
suspicion should follow order of recency, not order of perceived stability.

I now log cache keys in development. It costs nothing and it would have saved
the afternoon.
