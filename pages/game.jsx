import React from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Box, TextField, Layout, LegacyCard, Page, Tabs, TextContainer, Link, LegacyStack,
  Button,
  Collapsible,} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import '@shopify/polaris/build/esm/styles.css';

export default function Game() {

  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");
  const [player3, setPlayer3] = useState("Player 3");
  const [player4, setPlayer4] = useState("Player 4");

  const [player1Score, setPlayer1Score] = useState({});
  const [player2Score, setPlayer2Score] = useState({});
  const [player3Score, setPlayer3Score] = useState({});
  const [player4Score, setPlayer4Score] = useState({});

  const [open, setOpen] = useState(false);
  const handleToggle = useCallback(() => setOpen((open) => !open), []);


  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback((selectedTabIndex) => setSelected(selectedTabIndex), [],);

  const tabs = [
      {
        id: '6-cards',
        title: '2 groups (3 cards with the same number)',
        content: '6 cards',
        panelID: '6-cards',
      }, {
        id: '7-cards',
        title: '1 group (3 cards with the same number) 1 run (4 consecutive cards same suit)',
        content: '7 cards',
        panelID: '7-cards',
      }, {
      id: '8-cards',
      title: '2 groups (3 cards with the same number)',
      content: '8 cards',
      panelID: '8-cards',
    },
  ];
  return <AppProvider i18n={enTranslations}>
    <Page fullWidth>
      <Layout>
        <Layout.Section variant="oneThird">
          <Box maxWidth={'90%'}>
            <LegacyCard sectioned title="Game setup">
              <TextField
                  value={player1}
                  onChange={setPlayer1}
                  label={"Player 1 name"}
                  autoComplete={"off"}
              />
              <TextField
                  value={player2}
                  onChange={setPlayer2}
                  label={"Player 2 name"}
                  autoComplete={"off"}
              />
              <TextField
                  value={player3}
                  onChange={setPlayer3}
                  label={"Player 3 name"}
                  autoComplete={"off"}
              />
              <TextField
                  value={player4}
                  onChange={setPlayer4}
                  label={"Player 4 name"}
                  autoComplete={"off"}
              />

            </LegacyCard>
          </Box>
        </Layout.Section>
        <Layout.Section>
          <Box maxWidth={'90%'}>
            <LegacyCard sectioned title="">
              <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                <LegacyCard.Section title={tabs[selected].title}>
                  <TextField
                      value={player1Score[tabs[selected].id]}
                      onChange={(value) => setPlayer1Score({...player1Score, [tabs[selected].id]: Number(value)})}
                      label={player1 + " score"}
                      autoComplete={"name"}
                  />
                  <TextField
                      value={player2Score[tabs[selected].id]}
                      onChange={(value) => setPlayer2Score({...player2Score, [tabs[selected].id]: Number(value)})}
                      label={player2 + " score"}
                      autoComplete={"name"}
                  />
                  <TextField
                      value={player3Score[tabs[selected].id]}
                      onChange={(value) => setPlayer3Score({...player3Score, [tabs[selected].id]: Number(value)})}
                      label={player3 + " score"}
                      autoComplete={"name"}
                  />
                  <TextField
                      value={player4Score[tabs[selected].id]}
                      onChange={(value) => setPlayer4Score({...player4Score, [tabs[selected].id]: Number(value)})}
                      label={player4 + " score"}
                      autoComplete={"name"}
                  />
                    <LegacyStack vertical>
                      <Button
                          onClick={handleToggle}
                          ariaExpanded={open}
                          ariaControls="basic-collapsible"
                      >
                        Scores
                      </Button>
                      <Collapsible
                          open={open}
                          id="basic-collapsible"
                          transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
                          expandOnPrint
                      >
                        <TextContainer>
                          <p>{player1} score: {Object.values(player1Score).reduce((accumulator, a) => accumulator + a, 0)}</p>
                          <p>{player2} score: {Object.values(player2Score).reduce((accumulator, a) => accumulator + a, 0)}</p>
                          <p>{player3} score: {Object.values(player3Score).reduce((accumulator, a) => accumulator + a, 0)}</p>
                          <p>{player4} score: {Object.values(player4Score).reduce((accumulator, a) => accumulator + a, 0)}</p>
                        </TextContainer>
                      </Collapsible>
                    </LegacyStack>
                </LegacyCard.Section>
              </Tabs>
            </LegacyCard>
          </Box>
        </Layout.Section>
      </Layout>


    </Page>

  </AppProvider>
}