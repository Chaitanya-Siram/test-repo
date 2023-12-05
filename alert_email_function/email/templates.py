
def sentiment_email_template():
    return """
    <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
    <title>Alert Email for Change in Sentiment</title>
    </head>

    <body>

    <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
        <td align="center">
            <table cellspacing="0" cellpadding="20" style="border: 2px solid black;">
            <tr>
                <td>
                <img src="https://amx-images.s3.us-west-1.amazonaws.com/DarkLogo.svg" alt="icon" width="30" />
                <h3 style="color: #0A0A0A; font-size: 1rem; font-weight: 600;">AlphametricX</h3>
                <h1 style="color: #000; font-size: 2.0rem; font-weight: 700;">Alert Email for Change in Sentiment for
                <br>Your Query "{{ query_title }}"
                </h1>
                <h5
                    style="color: #000; font-size: 1.1rem; font-style:normal; font-weight:700; line-height:1.5rem; letter-spacing: -0.15px">
                    Dear {{ first_name }}
                </h5>
                <p style="color: #000; font-size: 1rem; font-style:normal; font-weight:700; line-height:1.5rem">
                    This email is to notify you about the recent change in sentiment for your saved search string
                    <br>"{{ search_query }}".
                </p>

                <p style="color: #000; font-size: 1rem; font-style:normal; font-weight:700; line-height:1.5rem">
                    The net sentiment on the query has {{ change_text }} by your pre-defined <span style="color: blue"> {{ pre_defined_percent }}% </span>,
                    <br>and the new overall sentiment is <span style="color: {{changes_color}}"> {{ updated_sentiment }}</span>.
                </p>
                <p style="color: #000; font-size: 1rem; font-weight: 700; line-height:1.5rem">
                    To know more details about the sentiment changes, log in to your account with AlphametricX today.
                </p>
                <br>
                <p style="color: #000; font-size: 1rem; font-weight: 700; line-height:1.5rem">
                    Thank you for being a valued user of AlphametricX!
                </p>
                <p style="color: #000; font-size: 1rem; font-weight: 700;">
                    Best regards
                </p>
                </td>
            </tr>
            <tr style="background-color: #ECEFF3;">
                <td>
                <p
                    style="color: #000; font-size: 0.9rem; font-style:normal; font-weight:700; line-height:1.5rem; letter-spacing: -0.15px">
                    Copyright 2023 Alphametricx inc. All rights reserved.
                </p>
                <p
                    style="color: #000; font-size: 0.9rem; font-style:normal; font-weight:700; line-height:1.5rem; letter-spacing: -0.15px">
                    We are located at 800 E Campbell Road, Suite 288 Richardson, Dallas, Texas - 75081
                </p>
                <table>
                    <tr>
                    <td>
                        <img src="https://amx-images.s3.us-west-1.amazonaws.com/linkedin-svgrepo-com+1.svg" alt="LinkedIn"
                        style="width: 1.5rem; height:1.5rem; align-items: center; border-radius: 4px; background: #696e74;" />
                    </td>
                    <td>
                        <img src="https://amx-images.s3.us-west-1.amazonaws.com/logo+1.svg" alt="Twitter"
                        style="width: 1.5rem; height:1.5rem; align-items: center; border-radius: 4px; background: #696e74;" />
                    </td>
                    </tr>
                </table>
                <table
                    style="color: #000; font-size: 0.9rem; font-style:normal; font-weight:700; line-height:1.5rem; letter-spacing: -0.15px">
                    <tr>
                    <td>
                        Privacy policy • Contact us
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>
        </td>
        </tr>
    </table>
    </body>

    </html>
    """


def volume_email_template():
    return """
    <!DOCTYPE html>
    <html lang="en">

    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
    <title>Alert Email for Change in Sentiment</title>
    </head>

    <body>

    <table width="100%" cellspacing="0" cellpadding="0">
        <tr>
        <td align="center">
            <table cellspacing="0" cellpadding="20" style="border: 2px solid black;">
            <tr>
                <td>
                <img src="https://amx-images.s3.us-west-1.amazonaws.com/DarkLogo.svg" alt="icon" width="30" />
                <h3 style="color: #0A0A0A; font-size: 1rem; font-weight: 600;">AlphametricX</h3>
                <h1 style="color: #000; font-size: 2.0rem; font-weight: 700;">Alert Email for Change in Search Volume for
                    <br>Your Query : {{ query_title }}
                </h1>
                <h5
                    style="color: #000; font-size: 1.1rem; font-style:normal; font-weight:700; line-height:1.5rem; letter-spacing: -0.15px">
                    Dear {{ first_name }}
                </h5>
                <p style="color: #000; font-size: 1rem; font-style:normal; font-weight:700; line-height:1.5rem">
                    This email is to notify you about the recent change in volume for your saved search string
                    <br>"{{ search_query }}".
                </p>
                <p style="color: #000; font-size: 1rem; font-style:normal; font-weight:700; line-height:1.5rem">
                    The search volume on the query has {{ change_text }} by your pre-defined <span style="color: blue"> {{ pre_defined_percent }}% </span>,
                    <br>and the new volume is <span style="color: {{ changes_color }}"> {{ changes_volume }} </span>.
                </p>
                <p style="color: #000; font-size: 1rem; font-weight: 700; line-height:1.5rem">
                    To know more details about the change in volume and to stay updated on the latest discussions
                    <br> and news around your topic of interest, login to your account with AlphametricX today.
                </p>
                <br>
                <p style="color: #000; font-size: 1rem; font-weight: 700;">
                    Thank you for being a valued user of AlphametricX!
                </p>
                <p style="color: #000; font-size: 1rem; font-weight: 700;">
                    Best regards
                </p>
                </td>
            </tr>
            <tr style="background-color: #ECEFF3;">
                <td>
                <p
                    style="color: #000; font-size: 0.9rem; font-style:normal; font-weight:700; line-height:1.5rem; letter-spacing: -0.15px">
                    Copyright 2023 Alphametricx inc. All rights reserved.
                </p>
                <p
                    style="color: #000; font-size: 0.9rem; font-style:normal; font-weight:700; line-height:1.5rem; letter-spacing: -0.15px">
                    We are located at 800 E Campbell Road, Suite 288 Richardson, Dallas, Texas - 75081
                </p>
                <table>
                    <tr>
                    <td>
                        <img src="https://amx-images.s3.us-west-1.amazonaws.com/linkedin-svgrepo-com+1.svg" alt="LinkedIn"
                        style="width: 1.5rem; height:1.5rem; align-items: center; border-radius: 4px; background: #696e74;" />
                    </td>
                    <td>
                        <img src="https://amx-images.s3.us-west-1.amazonaws.com/logo+1.svg" alt="Twitter"
                        style="width: 1.5rem; height:1.5rem; align-items: center; border-radius: 4px; background: #696e74;" />
                    </td>
                    </tr>
                </table>
                <table
                    style="color: #000; font-size: 0.9rem; font-style:normal; font-weight:700; line-height:1.5rem; letter-spacing: -0.15px">
                    <tr>
                    <td>
                        Privacy policy • Contact us
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>
        </td>
        </tr>
    </table>
    </body>

    </html>
    """