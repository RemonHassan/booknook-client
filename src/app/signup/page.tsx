"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Sparkles,
  Loader2,
  User,
  Image as ImageIcon,
  Mail,
  Lock,
} from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
      email: string;
      password: string;
    };

    try {
      const { data, error } = await authClient.signUp.email({
        ...user,
      });

      if (data) {
        toast.success("Account created successfully!");
        router.push("/");
        router.refresh();
      }

      if (error) {
        console.error("Sign up error:", error);
        toast.error(error.message || "Failed to create account.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  // GOOGLE signIN
  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* AMBIENT BACKGROUND GLOWS */}
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* BRANDING HEADER */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-950/80 group-hover:bg-emerald-500 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-linear-to-r from-stone-100 via-amber-100 to-emerald-400 bg-clip-text text-transparent">
              BookNook
            </span>
          </Link>
          <p className="text-xs text-stone-400">
            Join our community of book lovers and digital collectors.
          </p>
        </div>

        {/* SIGN UP CARD */}
        <Card className="border-stone-800 bg-stone-900 text-stone-100 shadow-2xl rounded-2xl">
          <CardHeader className="text-center space-y-1.5 pb-4 border-b border-stone-800/80">
            <CardTitle className="text-2xl font-bold tracking-tight text-stone-100 flex items-center justify-center gap-2">
              <span>Create an Account</span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </CardTitle>
            <CardDescription className="text-xs text-stone-400">
              Sign up with Google or enter your details below
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleEmailSignUp}>
              <FieldGroup className="space-y-4">
                {/* GOOGLE OAUTH BUTTON */}
                <Field>
                  <Button
                    onClick={handleGoogleSignIn}
                    variant="outline"
                    type="button"
                    className="w-full flex items-center justify-center gap-2 rounded-xl border-stone-800 bg-stone-950 py-2.5 text-xs font-semibold text-stone-200 hover:bg-stone-800 hover:text-white hover:border-stone-700 transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>Sign in with Google</span>
                  </Button>
                </Field>

                <FieldSeparator className="text-xs text-stone-500 *:data-[slot=field-separator-content]:bg-stone-900 *:data-[slot=field-separator-content]:px-3">
                  Or continue with
                </FieldSeparator>

                {/* NAME FIELD */}
                <Field className="space-y-1.5">
                  <FieldLabel
                    htmlFor="name"
                    className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Name</span>
                  </FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    required
                    className="rounded-xl border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500 text-sm"
                  />
                </Field>

                {/* IMAGE URL FIELD */}
                <Field className="space-y-1.5">
                  <FieldLabel
                    htmlFor="image"
                    className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-1.5"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Avatar Image URL</span>
                  </FieldLabel>
                  <Input
                    id="image"
                    type="url"
                    name="image"
                    placeholder="https://example.com/avatar.jpg"
                    required
                    className="rounded-xl border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500 text-sm"
                  />
                </Field>

                {/* EMAIL FIELD */}
                <Field className="space-y-1.5">
                  <FieldLabel
                    htmlFor="email"
                    className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Email Address</span>
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="jane@example.com"
                    required
                    className="rounded-xl border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500 text-sm"
                  />
                </Field>

                {/* PASSWORD FIELD */}
                <Field className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      htmlFor="password"
                      className="text-xs font-semibold uppercase tracking-wider text-stone-300 flex items-center gap-1.5"
                    >
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Password</span>
                    </FieldLabel>
                    <a
                      href="#"
                      className="text-xs text-stone-400 hover:text-emerald-400 transition-colors underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="rounded-xl border-stone-800 bg-stone-950 text-stone-100 placeholder:text-stone-600 focus-visible:ring-emerald-500 text-sm"
                  />
                </Field>

                {/* SUBMIT BUTTON */}
                <Field className="pt-2 space-y-3">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-950/80 hover:bg-emerald-500 active:scale-[0.99] transition-all"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <span>Register</span>
                    )}
                  </Button>

                  <FieldDescription className="text-center text-xs text-stone-400">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-semibold text-emerald-400 hover:text-emerald-300 underline-offset-4 hover:underline"
                    >
                      Log In
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        {/* FOOTER POLICIES */}
        <p className="px-4 text-center text-xs text-stone-500 leading-relaxed">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline text-stone-400 hover:text-stone-200">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline text-stone-400 hover:text-stone-200">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
