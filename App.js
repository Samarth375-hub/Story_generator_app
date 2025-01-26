// import './App.css';

// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [prompt, setPrompt] = useState('');
//   const [story, setStory] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Function to handle the generation of the story
//   const generateStory = async () => {
//     if (!prompt) {
//       alert('Please enter a prompt');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Send POST request to Flask API
//       const response = await axios.post('http://127.0.0.1:5000/generate', {
//         prompt: prompt
//       });
//       setStory(response.data.story);
//     } catch (error) {
//       console.error('Error generating story:', error);
//       alert('Error generating story');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
//       <h1>Story Generator</h1>

//       {/* Input form */}
//       <textarea
//         placeholder="Enter your story prompt here"
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         rows="4"
//         cols="50"
//         style={{ marginBottom: '10px' }}
//       />
//       <br />

//       {/* Button to trigger story generation */}
//       <button onClick={generateStory} disabled={loading} style={{ margin: '10px' }}>
//         {loading ? 'Generating...' : 'Generate Story'}
//       </button>

//       {/* Display the generated story */}
//       {story && (
//         <div>
//           <h2>Generated Story</h2>
//           <p>{story}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

const StoryGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [story, setStory] = useState('');

    const handleGenerateStory = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });
            const data = await response.json();
            setStory(data.story);
        } catch (error) {
            console.error('Error generating story:', error);
        }
    };

    return (
        <Container>
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>
                    Story Generator
                </Typography>
                <TextField
                    label="Enter a story prompt"
                    variant="outlined"
                    fullWidth
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleGenerateStory}
                >
                    Generate Story
                </Button>
                {story && (
                    <Box mt={5}>
                        <Typography variant="h6">Generated Story:</Typography>
                        <Typography variant="body1">{story}</Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default StoryGenerator;
