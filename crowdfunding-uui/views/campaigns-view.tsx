import React, { ChangeEvent, useState } from "react";
import {
  AnchorProvider,
  BN,
  Idl,
  Program,
  utils,
  web3,
} from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { Commitment, Connection, PublicKey } from "@solana/web3.js";
import idl from "../idl.json";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import CampaignsTable from "../components/campaigns-table";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
const opts: { preflightCommitment: Commitment } = {
  preflightCommitment: "processed",
};

const programId = new PublicKey(idl.metadata.address);

interface CampaignsViewProps {
  network: string;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({ network }) => {
  const wallet = useWallet();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState<number>(1);

  const getProgram = () => {
    /* create the provider and return it to the caller */
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(connection, wallet as any, opts);
    /* create the program interface combining the idl, program ID, and provider */
    const program = new Program(idl as Idl, programId, provider);
    return program;
  };

  const program = getProgram();

  const onNameChange = (e: ChangeEvent<any>) => {
    setName(e.target.value);
  };

  const onDescriptionChange = (e: ChangeEvent<any>) => {
    setDescription(e.target.value);
  };

  const onTargetAmountChange = (e: ChangeEvent<any>) => {
    setTargetAmount(e.target.value);
  };

  const createCampaign = async () => {
    const [campaign] = await PublicKey.findProgramAddress(
      [utils.bytes.utf8.encode("campaign_demo"), wallet.publicKey!.toBuffer()],
      program.programId
    );
    await program.methods
      .create(name, description, new BN(targetAmount))
      .accounts({
        campaign: campaign,
        user: wallet.publicKey!,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();
  };

  return (
    <div className="CampaignsView p-5 bg-gradient-to-br from-purple-800 to-pink-500">
      <div className="container mx-auto">
        {!wallet.connected && (
          <p className="text-white text-lg font-semibold mb-5">
            Please connect your wallet to view campaigns
          </p>
        )}

        <div className="row mt-8">
          <div className="col-md-8 mx-auto">
            <div className="card shadow-lg">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label text-black" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the name of your campaign"
                      value={name}
                      onChange={onNameChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      className="form-label text-black"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Enter the description of your campaign"
                      style={{ height: "150px" }}
                      value={description}
                      onChange={onDescriptionChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      className="form-label text-black"
                      htmlFor="targetAmount"
                    >
                      Target Amount (SOL)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter the target amount of your campaign"
                      value={targetAmount}
                      onChange={onTargetAmountChange}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={createCampaign}
                    >
                      Create Campaign
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignsView;
