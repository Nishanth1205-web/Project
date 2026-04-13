import urllib.request
import urllib.parse
import re

def download_ddg(query, filename):
    req = urllib.request.Request(
        'https://html.duckduckgo.com/html/?q=' + query.replace(' ', '+'), 
        headers={'User-Agent': 'Mozilla/5.0'}
    )
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        matches = re.findall(r'//external-content\.duckduckgo\.com/iu/\?u=([^&\"\'\s]+)', html)
        for m in matches:
            url = urllib.parse.unquote(m)
            if '.gif' in url.lower():
                try:
                    urllib.request.urlretrieve(url, 'images/' + filename)
                    return True
                except:
                    pass
    except Exception as e:
        print(f"Error fetching {query}: {e}")
    return False

if download_ddg('jerry mouse running transparent gif', 'jerry.gif'):
    print("Downloaded jerry.gif")
if download_ddg('tom cat running transparent gif', 'tom.gif'):
    print("Downloaded tom.gif")
if download_ddg('cartoon fight dust cloud transparent gif', 'fight.gif'):
    print("Downloaded fight.gif")
