import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router';
import { CircleCheck, CircleX, Loader2 } from "lucide-react";

import { useConfirmVerification } from '../../hooks/useAuth';
import { Button } from '@/components/ui/button';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const { mutate: confirmVerification, isPending, isSuccess, isError, error } = useConfirmVerification();

  useEffect(() => {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (userId && secret) {
      confirmVerification({ userId, secret });
    }
  }, [searchParams, confirmVerification]);

  let content;

  if (isPending) {
    content = (
      <>
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold tracking-tight">Verifying...</h2>
        <p className="text-muted-foreground">Please wait while we verify your email.</p>
      </>
    );
  } else if (isSuccess) {
    content = (
      <>
        <CircleCheck className="h-12 w-12 text-green-500" />
        <h2 className="text-2xl font-semibold tracking-tight">Email Verified!</h2>
        <p className="text-muted-foreground">Your account is now active. You can proceed to login.</p>
        <Button asChild className="mt-4 w-full">
          <Link to="/login">Go to Login</Link>
        </Button>
      </>
    );
  } else if (isError) {
    content = (
      <>
        <CircleX className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-semibold tracking-tight">Verification Failed</h2>
        <p className="text-muted-foreground">
          {error?.message || "The link might be invalid or has expired."}
        </p>
      </>
    );
  } else {

    content = (
      <>
        <CircleX className="h-12 w-12 text-destructive" />
        <h2 className="text-2xl font-semibold tracking-tight">Invalid Link</h2>
        <p className="text-muted-foreground">
          The verification link is missing required information.
        </p>
      </>
    );
  }

  return (

    <div className="w-full max-w-sm p-8 space-y-6 bg-card text-card-foreground rounded-xl border shadow-sm text-center">
      {content}
    </div>
  );
}

export default VerifyEmail;