import VerifyMail from '@/src/components/auth/VerifyMail';
import { cookies } from 'next/headers';

const Page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return (
    <>
      <VerifyMail temp={token} />
    </>
  );
};

export default Page;
