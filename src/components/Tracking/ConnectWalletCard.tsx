import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useAccount, useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils.js";
import { Fuul, Conversion } from "@fuul/sdk";


const ACCEPT_REFERRAL_MESSAGE = `Accept referral at: ${new Date().toISOString()}`;

interface Props {
  conversion: Conversion;
}

const ConnectWalletCard = ({ conversion }: Props): JSX.Element => {
  const [connectedAddress, setConnectedAddress] = useState<string>();

  const { signMessageAsync } = useSignMessage({
    onSuccess(signature, variables) {
      const address = verifyMessage(variables.message, signature);

      if (address !== connectedAddress) {
        window.alert("Invalid signature");
      } else {
        Fuul.sendConnectWallet({
          address: connectedAddress,
          signature,
          message: variables.message as string,
        });
      }
    },
  });

  useAccount({
    async onConnect({ address }) {
      setConnectedAddress(address);

      await signMessageAsync({
        message: ACCEPT_REFERRAL_MESSAGE,
      });
    },
  });

  return (
    <>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h4" textAlign="center" marginBottom="8px">
              Join {conversion?.project.name} referral program!{" "}
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              How it works
            </Typography>
            <Box
              textAlign="left"
              marginBottom="24px"
              display="flex"
              flexDirection="column"
              gap="0.5rem"
            >
              <Typography variant="body1">
                1. Connect your wallet to become eligible for rewards on your
                future transactions
              </Typography>
              <Typography variant="body1">
                2. To effectively join, you must sign a message (no fee, no key
                access) with your wallet to verify that you are eligible.
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                sx={{
                  marginTop: "2rem",
                }}
              >
                <ConnectButton label="Connect wallet" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ConnectWalletCard;
