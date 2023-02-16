import React, { useEffect, useState } from 'react';
import { BN, Program, ProgramAccount, web3 } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { Button, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

interface CampaignsTableProps {
    program: Program;
    walletKey: PublicKey;
}

export const CampaignsTable: React.FC<CampaignsTableProps> = ({
    program,
    walletKey,
}) => {
    const [campaigns, setCampaigns] = useState<ProgramAccount[]>([]);

    const getAllCampaigns = async () => {
        const campaigns = await program.account.campaign.all();
        setCampaigns(campaigns);
    };

    useEffect(() => {
        getAllCampaigns();
    }, [walletKey]);

    const donate = async (campaignKey: PublicKey) => {
        try {
            await program.methods
                .donate(new BN(0.2 * web3.LAMPORTS_PER_SOL))
                .accounts({
                    campaign: campaignKey,
                    user: walletKey,
                    systemProgram: web3.SystemProgram.programId,
                })
                .rpc();
            await getAllCampaigns();
        } catch (err) {
            console.error('Donate transaction error: ', err);
        }
    };

    const withdraw = async (campaignKey: PublicKey) => {
        try {
            await program.methods
                .withdraw(new BN(0.2 * web3.LAMPORTS_PER_SOL))
                .accounts({
                    campaign: campaignKey,
                    user: walletKey,
                })
                .rpc();
        } catch (err) {
            console.error('Withdraw transaction error: ', err);
        }
    };

    const allCampaigns: () => JSX.Element[] = () => {
        return campaigns.map((c, i) => {
            const key = c.publicKey.toBase58();

            return (
                <Card key={key} className="m-3">
                  <Card.Body>
                    <Card.Title>{c.account.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Target Amount: {c.account.targetAmount.toString()}
                    </Card.Subtitle>
                    <Card.Text>{c.account.description}</Card.Text>
                    <Card.Text>Donated: {(c.account.amountDonated / web3.LAMPORTS_PER_SOL).toString()}</Card.Text>
                    <div className="d-grid gap-2">
                      <Button variant="primary" onClick={() => donate(c.publicKey)}>
                        Donate
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => withdraw(c.publicKey)}
                        disabled={c.account.owner.toBase58() !== walletKey.toBase58()}
                      >
                        Withdraw
                      </Button>
                    </div>
                  </Card.Body>
                  
                </Card>
              );
            });
          };
        
          return <div>{allCampaigns()}</div>;
        };
        
        export default CampaignsTable;