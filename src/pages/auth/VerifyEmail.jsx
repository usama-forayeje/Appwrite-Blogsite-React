import { useEffect } from 'react'
import { useConfirmVerification } from '../../hooks/useAuth';
import { CircleCheck, CircleX, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useSearchParams } from 'react-router';

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

  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Email Verification</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {isPending && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              <p className="text-lg">Verifying your email, please wait...</p>
            </>
          )}

          {isSuccess && (
            <>
              <CircleCheck className="h-12 w-12 text-green-500" />
              <p className="text-lg font-semibold">Email Verified Successfully!</p>
              <p>Your account is now active. You can now log in.</p>
              <Link to="/login" className="text-blue-600 underline">
                Go to Login Page
              </Link>
            </>
          )}

          {isError && (
            <>
              <CircleX className="h-12 w-12 text-red-500" />
              <p className="text-lg font-semibold">Verification Failed</p>
              <p className="text-sm text-muted-foreground">
                {error?.message || "The link might be invalid or has expired."}
              </p>
            </>
          )}

          {/* যদি URL এ userId বা secret না থাকে */}
          {!isPending && !isSuccess && !isError && (
             <>
              <CircleX className="h-12 w-12 text-red-500" />
              <p className="text-lg font-semibold">Invalid Link</p>
              <p className="text-sm text-muted-foreground">
                The verification link is missing required information.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyEmail