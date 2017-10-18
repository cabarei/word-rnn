print("\nloading...")

import numpy as np
import tensorflow as tf

import argparse
import time
import os
from six.moves import cPickle

from utils import TextLoader
from model import Model

os.environ['TF_CPP_MIN_LOG_LEVEL']='2'


stop_keyword = "xxxxxx "
linebreak_keyword = "xxx "
division_line = "-"*26



def main(starting_words):

    parser = argparse.ArgumentParser()

    parser.add_argument('--save_dir', type=str, default='save',
                       help='model directory to load stored checkpointed models from')
    parser.add_argument('-n', type=int, default=30,
                       help='number of words to sample')
    parser.add_argument('--starting_with', type=str, default=stop_keyword,
                       help='prime text')
    parser.add_argument('--pick', type=int, default=1,
                       help='1 = weighted pick, 2 = beam search pick')
    parser.add_argument('--width', type=int, default=4,
                       help='width of the beam search')
    parser.add_argument('--sample', type=int, default=1,
                       help='0 to use max at each timestep, 1 to sample at each timestep, 2 to sample on spaces')
    parser.add_argument('--number', type=int, default=10, help='number of samples')

    args = parser.parse_args()
    args.haiku = True
    args.starting_with = stop_keyword + starting_words

    return sample(args)



def sample(args):

    tf.reset_default_graph()

    print("\nthinking haikus...", end="\n\n\n")

    with open(os.path.join(args.save_dir, 'config.pkl'), 'rb') as f:
        saved_args = cPickle.load(f)
    with open(os.path.join(args.save_dir, 'words_vocab.pkl'), 'rb') as f:
        words, vocab = cPickle.load(f)
    model = Model(saved_args, True)


    with tf.Session() as sess:

        tf.global_variables_initializer().run()

        saver = tf.train.Saver(tf.global_variables())
        ckpt = tf.train.get_checkpoint_state(args.save_dir)

        if ckpt and ckpt.model_checkpoint_path:
            saver.restore(sess, ckpt.model_checkpoint_path)

            samples = []

            for i in range(args.number):
              sample = model.sample(sess, words, vocab, args.n, args.starting_with, args.sample, args.pick, args.width, args.haiku)
              samples.append(sample)

            # show_haikus(samples)

    return samples



def show_haikus(haikus):

    print(division_line)

    for haiku in haikus:
        print("")

        haiku_verse = haiku.split(stop_keyword)
        haiku = haiku_verse[1] #if len(haiku_verse) > 1 else ""
        haiku = haiku.replace(linebreak_keyword, "\n")

        print(haiku, end="\n\n")
        input(division_line)



if __name__ == '__main__':
    main()
