import urllib.request
import re
import json

urls = [
    'https://tenor.com/search/tom-and-jerry-stickers',
    'https://tenor.com/search/cartoon-fight-cloud-stickers'
]

for url in urls:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        content = urllib.request.urlopen(req).read().decode('utf-8')
        # Tenor puts JSON state in window.__init_state__ or similar, we can just regex for media.tenor.com
        matches = list(set(re.findall(r'https://media\.tenor\.com/[A-Za-z0-9_-]+/[a-zA-Z0-9_-]+\.gif', content)))
        print(f"URLS FOR {url}:")
        for m in matches[:5]:
            print(m)
    except Exception as e:
        print(e)
