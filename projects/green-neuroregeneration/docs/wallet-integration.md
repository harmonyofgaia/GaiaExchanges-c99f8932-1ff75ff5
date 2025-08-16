# Wallet Integration (Reuse Existing Green Investments Wallet)

Goals
- Single sign-on, signatures, voting, and payouts through the existing wallet stack.

Adapter Contract (abstract)
- Auth.login(): returns user DID/address and roles.
- Sign.verify(message, signature): for proposal and vote receipts.
- Vote.cast(ballotId, choice, weight, proof?): emits on-chain/off-chain receipt.
- Treasury.proposePayout(awardId, amount, recipient): submits to multisig/treasury.
- Treasury.executePayout(proposalId): executes after approvals/timelock.
- Identity.getReputation(user): returns sybil resistance signals.
- Webhooks: onWalletLinked, onVoteCast, onPayoutExecuted.

Security
- No private keys stored; signatures verified client-side and server-side.
- E2EE chat identities bound to wallet identity via SSO assertions.