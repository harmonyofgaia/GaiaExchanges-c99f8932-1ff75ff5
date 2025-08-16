# Wallet Integration (Reuse Existing Green Investments Wallet)

Goals
- Single sign-on, signatures, voting, and payouts through the existing wallet stack.

Adapter Contract (abstract)
- Auth.login(): returns user DID/address and roles.
- Sign.verify(message, signature): for proposal and vote receipts.
- Vote.cast(ballotId, choice, weight, proof?: ZKProof | null): emits on-chain/off-chain receipt.
  - `proof` should be a zero-knowledge proof object (`ZKProof`) when sybil resistance or eligibility verification is required; otherwise, pass `null`.

**ZKProof Object**
- A `ZKProof` object should contain the necessary fields to represent a zero-knowledge proof, such as:
  - `proof`: The cryptographic proof data (string or object).
  - `publicSignals`: Any public signals or inputs required for verification.
  - `protocol`: (optional) The protocol or scheme used (e.g., zkSNARK, zkSTARK).
- For more details, refer to the [ZKProof specification](https://zkproof.org/) or your project's implementation.
- Treasury.proposePayout(awardId, amount, recipient): submits to multisig/treasury.
- Treasury.executePayout(proposalId): executes after approvals/timelock.
- Identity.getReputation(user): returns sybil resistance signals.
- Webhooks: onWalletLinked, onVoteCast, onPayoutExecuted.

Security
- No private keys stored; signatures verified client-side and server-side.
- E2EE chat identities bound to wallet identity via SSO assertions.