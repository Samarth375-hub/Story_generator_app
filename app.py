from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM
from flask_cors import CORS


# Initialize the Flask app
app = Flask(__name__)

CORS(app)

# Load the model and tokenizer
MODEL_NAME = "gpt2"  # You can replace this with any other text-generation model
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)

tokenizer.pad_token = tokenizer.eos_token


@app.route('/generate', methods=['POST'])
def generate_story():
    data = request.json
    prompt = data.get('prompt', '')
    
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400
    
    # Generate text using the model
    inputs = tokenizer(prompt, return_tensors="pt",padding =True, truncation = True)
    try:
        
        outputs = model.generate(
            inputs['input_ids'],
            attention_mask = inputs['attention_mask'],
            max_length=150,
            num_return_sequences=1,
            do_sample=True,
            top_p=0.9, 
            top_k=60,
            temperature = 0.8,
            pad_token_id = tokenizer.pad_token_id
            )
        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
     
        return jsonify({"prompt": prompt, "story": generated_text})
    except Exception as e:
        
        print(f"Error during text generation: {e}") 
        return jsonify({"error":" An error occurred during text generation."}),500

if __name__ == '__main__':
    app.run(debug=True)
