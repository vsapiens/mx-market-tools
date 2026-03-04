#!/usr/bin/env bash
# check-secrets.sh — Scans the public repo for patterns that should NEVER appear.
# Run this in CI and before every release.

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

ERRORS=0

# Patterns that indicate leaked secrets or proprietary code
FORBIDDEN_PATTERNS=(
  # API keys / secrets
  "ANTHROPIC_API_KEY"
  "SUPABASE_SERVICE_ROLE_KEY"
  "STRIPE_SECRET_KEY"
  "STRIPE_WEBHOOK_SECRET"
  "UPSTASH_REDIS_REST_URL"
  "UPSTASH_REDIS_REST_TOKEN"

  # Proprietary scoring / analysis
  "computeSignals"
  "normalizedScore"
  "drawdown_risk"
  "maxDrawdown"
  "SignalsResult"

  # Proprietary tier system
  "getTierFeatures"
  "TIER_FEATURES"
  "buildPrompt"

  # Proprietary types
  "PortfolioDecision"
)

echo "Checking for forbidden patterns in source files..."
echo ""

for pattern in "${FORBIDDEN_PATTERNS[@]}"; do
  # Search all source files, excluding node_modules, dist, .git, and this script
  MATCHES=$(grep -r --include="*.ts" --include="*.tsx" --include="*.js" --include="*.json" \
    -l "$pattern" . \
    --exclude-dir=node_modules \
    --exclude-dir=dist \
    --exclude-dir=.git \
    --exclude="check-secrets.sh" \
    2>/dev/null || true)

  if [ -n "$MATCHES" ]; then
    echo -e "${RED}FAIL${NC}: Found '$pattern' in:"
    echo "$MATCHES" | sed 's/^/  /'
    ERRORS=$((ERRORS + 1))
  fi
done

echo ""
if [ "$ERRORS" -gt 0 ]; then
  echo -e "${RED}Found $ERRORS forbidden pattern(s). This repo must not contain proprietary code or secrets.${NC}"
  exit 1
else
  echo -e "${GREEN}All clear — no forbidden patterns found.${NC}"
  exit 0
fi
