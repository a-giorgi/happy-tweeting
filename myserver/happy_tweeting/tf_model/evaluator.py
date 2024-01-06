import string
import tensorflow as tf
import tensorflow_hub as hub


class Evaluator:
    # place the checkpoint path here:
    checkpoint_path = "CHECKPOINTS_PATH/ckpt.h5"

    def __init__(self, verbose=False):
        self.verbose = verbose
        self.print_if_verbose("Initialization started")
        self.print_if_verbose("Downloading USE from Tensorflow Hub")
        universal_sentence_extractor = hub.KerasLayer("https://tfhub.dev/google/universal-sentence-encoder/4",
                                                      input_shape=[],
                                                      dtype=tf.string,
                                                      trainable=False,
                                                      name="USE")
        self.print_if_verbose("USE downloaded!")
        model = tf.keras.Sequential([
            universal_sentence_extractor,
            tf.keras.layers.Dense(128, activation="relu", kernel_regularizer="l2"),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(128, activation="relu", kernel_regularizer="l2"),
            tf.keras.layers.Dense(1, activation="sigmoid")], name="model_use_fe")
        self.print_if_verbose("Model loaded!")
        model.load_weights(self.checkpoint_path)
        self.print_if_verbose("Checkpoints loaded!")
        self.model = model

    def preprocess(self, sentence):
        output = sentence.lower()
        for character in string.digits:
            output = output.replace(character, '@')
        # removing mentions and hashtags
        output = " ".join(filter(lambda x: x[0] != '@', output.split()))
        output = " ".join(filter(lambda x: x[0] != '#', output.split()))
        # removing punctuation
        for character in string.punctuation:
            output = output.replace(character, '')
        self.print_if_verbose("Preprocessed sentence: \n" + output)
        return output

    def predict(self, sentence):
        sentence_preprocessed = self.preprocess(sentence)
        score = self.model.predict(tf.expand_dims(sentence_preprocessed, axis=0))
        self.print_if_verbose(score)
        return tf.get_static_value(tf.squeeze(score))

    def print_if_verbose(self, text):
        if self.verbose:
            print(text)
