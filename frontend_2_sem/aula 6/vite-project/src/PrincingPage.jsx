import React from 'react'

import {
    CardHeader,
    Container,
    Card,
    CardContent,
    Typography,
    Button,
} from "@mui/material"

const planos = [
    {
        titulo: "Básico",
        preco: "Grátis",
        descricao: "Para começar a organizar-se",
        features: ["10GB de Armazenamento", "Suporte por email", "Até 3 projetos"],
        variant: "outlined"
    },
    {
        titulo: "Pro",
        preco: "R$49,90/mês",
        descricao: "Para profissionais+ e equipes pequenas",
        features: ["500GB de Armazenamento", "Suporte prioritário por email", "Projetos ilimitados"],
        variant: "contained"
    },
    {
        titulo: "Enterprise",
        preco: "Entre em contato",
        descricao: "Para grande Organização",
        features: ["Armazenamento Ilimitado", "Suporte 24/7 dedicado", "Analytics avançado"],
        variant: "outlined"
    },
]

function PrincingPage() {
    return (
        // utilizando o tailwind
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            {/* utilizando MUI */}
            <Container maxWidoth='lg'>
                {/* utilizando MUI e tailwind*/}
                <Typography variant='h3' component='h1' className="text-center tex-gray-800 font-bold mb-12">
                    Escolha o plano perfeito para você
                </Typography>
                <div className='grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8'>
                    {planos.map(cardItem => 
                        <Card key={cardItem.titulo} className="flex flex-col">
                            <CardHeader title={cardItem.titulo} className="bg-gray-200 text-center" />
                            <CardContent className="flex-grow">
                                <Typography variant="h4" className="text-center my-4">
                                    {cardItem.preco}
                                </Typography>
                                <Typography variant="subtitle1" className="text-center text-gray-600 mb-4">
                                    {cardItem.descricao}
                                </Typography>
                                <ul className='space-y-2'>
                                    {cardItem.features.map((featureItem) =>
                                    (<li key={featureItem} className="flex items-center">
                                        <span className='text-green-500 mr-20'></span>
                                        <Typography>{featureItem}</Typography>
                                    </li>
                                    ))}
                                </ul>
                            </CardContent>
                            {/* Botão de Ação */}
                            <div className='p-4'>
                                <Button variant={cardItem.variant} fullWidth>
                                    Subscrever
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default PrincingPage;