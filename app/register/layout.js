import Script from 'next/script';

export default function registerLayout({ children }) {
    return (
        <>
            <section>{children}</section>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        </>
    );
}