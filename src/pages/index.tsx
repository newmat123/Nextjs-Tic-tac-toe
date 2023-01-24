import TicTacToe from '@/components/TicTacToe'
import Head from 'next/head'

export default function Home() {
    return (
        <>
            <Head>
                <title>Tic tac toe</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="bg-slate-400 h-screen">
                <div className="flex justify-center pt-20">
                    <TicTacToe/>
                </div>
            </main>
        </>
    )
}
