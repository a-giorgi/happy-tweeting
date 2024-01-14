# Happy Tweeting 🐦
![x.png](/images/x.png)

## Introduction

In the current historical context, social media platforms are unfortunately inundated with highly negative posts and messages, significantly contributing to heightened stress levels among users. This project serves as a starting point for the development of a tool designed to enhance the conventional use of social media, with the goal of making the user experience more enjoyable.

## Overview

In summary, this project involves a Firefox browser extension that extracts tweets (just right after they are loaded) and sends them to a Django back-end for sentiment analysis. This analysis is performed by a neural network trained on the dataset [available here](https://huggingface.co/datasets/carblacac/twitter-sentiment-analysis/tree/main), which returns a score indicating the "negativity" of the analyzed tweet. Tweets identified as strongly negative will be subsequently hidden from the page.

All development details have been documented in the file ```project_diary.ipynb``` within the ```development``` directory.

## Installation Guide

### Server Installation

1. Create a Python Virtual Environment and install the required packages.

   ```bash
   # Example command
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Tensorflow Model Configuration**

   - Download checkpoints from [here](https://drive.google.com/file/d/1A9-h19IQytXYIe8jGElZbq4N1YMoA96q).
   - Place the `ckpt.h5` file in the `myserver/happy_tweeting/tf_model/checkpoints` folder.
   - Insert the absolute path of the `ckpt.h5` file into `evaluator.py` at line 8, replacing `CHECKPOINTS_PATH/ckpt.h5`.

3. **Server Startup**

   Open a terminal window and run the following command:

   ```bash
   python3 manage.py runserver
   ```

### Firefox Extension Configuration

1. Add the extension using the "Debug Add-ons" function in Firefox.
2. Select the `manifest.json` file within the `myextension` directory.
3. Once installed, add the backend URL and click "Check."
4. If the connection is successful (indicated by a green checkmark), click "Set Server URL" to confirm the backend.
![firefox_extension.png](/images/firefox_extension.png)

If everything has been configured correctly, visiting Twitter should display a green bar at the top.
