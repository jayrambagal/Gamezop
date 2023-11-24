import dynamic from "next/dynamic";
const PageNotFound = dynamic(() => import('@/components/PageNotFound/PageNotFound'), { ssr: false });


export default function c404() {
    return <div style={{ width: '100%', background: 'rgb(62, 81, 181)', margin: '0', padding: '0 0 20px 0' }}>
        <PageNotFound />
    </div>
}
