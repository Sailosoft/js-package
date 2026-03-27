import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Badge,
  Stack,
} from "@mui/material";
import { useDuelBoardCB } from "../../hooks/cb-use-duel-board.ts";
import { CBCard } from "../../interfaces/cb-card.interface.ts";

export default function CBBoard({ initialCards }: { initialCards: CBCard[] }) {
  const { layout, drawCard, playCard, destroyCard, shuffleDeck, canDraw } =
    useDuelBoardCB(initialCards);

  // Helper to find the first empty slot for the quick "Play" button
  const getFirstEmptySlot = (type: "monster" | "spell") => {
    const field = type === "monster" ? layout.monster : layout.spelltrap;
    return field.findIndex((slot) => slot.status === "empty");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        bgcolor: "#1a1a1a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* Field Area */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        {/* Monster Zones */}
        <Grid item xs={12}>
          <Typography variant="overline" sx={{ color: "#ff4444" }}>
            Monster Zones
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            {layout.monster.map((slot) => (
              <Paper
                key={slot.id}
                onClick={() =>
                  slot.status === "occupied" && destroyCard(slot.id, true)
                }
                sx={{
                  width: 100,
                  height: 140,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px dashed #444",
                  bgcolor:
                    slot.status === "occupied" ? "#2e7d32" : "transparent",
                  cursor: slot.status === "occupied" ? "pointer" : "default",
                  transition: "0.3s",
                  "&:hover": {
                    bgcolor: slot.status === "occupied" ? "#d32f2f" : "#222",
                  },
                }}
              >
                {slot.status === "occupied" ? (
                  <>
                    <Typography sx={{ fontSize: "2rem" }}>👾</Typography>
                    <Typography
                      variant="caption"
                      textAlign="center"
                      sx={{ px: 1 }}
                    >
                      {slot.card?.name}
                    </Typography>
                  </>
                ) : (
                  <Typography sx={{ fontSize: "1.5rem", opacity: 0.3 }}>
                    💀
                  </Typography>
                )}
              </Paper>
            ))}
          </Stack>
        </Grid>

        {/* Spell/Trap Zones */}
        <Grid item xs={12}>
          <Typography variant="overline" sx={{ color: "#33b5e5" }}>
            Spell & Trap Zones
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            {layout.spelltrap.map((slot) => (
              <Paper
                key={slot.id}
                onClick={() =>
                  slot.status === "occupied" && destroyCard(slot.id, false)
                }
                sx={{
                  width: 100,
                  height: 140,
                  border: "2px dashed #444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor:
                    slot.status === "occupied" ? "#006064" : "transparent",
                }}
              >
                {slot.status === "occupied" ? (
                  <>
                    <Typography sx={{ fontSize: "2rem" }}>📜</Typography>
                    <Typography
                      variant="caption"
                      textAlign="center"
                      sx={{ px: 1 }}
                    >
                      {slot.card?.name}
                    </Typography>
                  </>
                ) : (
                  <Typography sx={{ fontSize: "1.5rem", opacity: 0.3 }}>
                    🌀
                  </Typography>
                )}
              </Paper>
            ))}
          </Stack>
        </Grid>
      </Grid>

      {/* Hand and Controls */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          bgcolor: "#222",
          borderTop: "2px solid #444",
        }}
      >
        <Grid container alignItems="center">
          {/* Deck & Actions */}
          <Grid item xs={3}>
            <Stack direction="row" spacing={2}>
              <Badge badgeContent={layout.deck.cards.length} color="primary">
                <Button
                  variant="contained"
                  onClick={drawCard}
                  disabled={!canDraw}
                  sx={{ bgcolor: "#444", "&:hover": { bgcolor: "#666" } }}
                >
                  🎴 Draw
                </Button>
              </Badge>
              <Button
                variant="outlined"
                color="secondary"
                onClick={shuffleDeck}
                size="small"
              >
                Shuffle
              </Button>
            </Stack>
          </Grid>

          {/* Cards in Hand */}
          <Grid item xs={9}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ overflowX: "auto", pb: 1 }}
            >
              {layout.hand.cards.map((card) => (
                <Card
                  key={card.id}
                  sx={{
                    minWidth: 120,
                    height: 160,
                    bgcolor: "#333",
                    color: "white",
                    position: "relative",
                  }}
                >
                  <CardContent sx={{ p: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", fontSize: "0.75rem" }}
                    >
                      {card.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                      sx={{ color: "#aaa" }}
                    >
                      {card.type.toUpperCase()}
                    </Typography>
                    <Button
                      fullWidth
                      size="small"
                      variant="contained"
                      sx={{ mt: 1, fontSize: "0.6rem" }}
                      onClick={() =>
                        playCard(
                          card.id,
                          getFirstEmptySlot(
                            card.type === "monster" ? "monster" : "spell",
                          ),
                        )
                      }
                    >
                      Summon
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
