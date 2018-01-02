#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Autoupdater for PS4 Exploit Hosting by Al-Azif
   Source: https://github.com/Al-Azif/ps4-exploit-host
"""

from __future__ import print_function

try:
    import os
    import sys
    import urllib3
except ImportError:
    if sys.version_info.major < 3:
        print('ERROR: This must be run on Python 3')
        try:
            input('Press [ENTER] to exit')
        finally:
            sys.exit()
    else:
        print('ERROR: Import Error')
        try:
            input('Press [ENTER] to exit')
        finally:
            sys.exit()

SCRIPT_LOC = os.path.realpath(__file__)
CWD = os.path.dirname(SCRIPT_LOC)
PS4EH_URL = 'https://raw.githubusercontent.com/Al-Azif/ps4-exploit-host/master/start.py'
FDNS_URL = 'https://raw.githubusercontent.com/Al-Azif/FakeDns/master/main.py'


def get_data(url):
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    http = urllib3.PoolManager()

    response = http.request('GET', url,
                            headers={'User-Agent': 'PS4EH/Updater0.1'})

    return response.data.decode('utf-8')


def main():
    """Main Method"""
    try:
        with open(os.path.join(CWD, 'start.py'), 'w+') as buf:
            buf.write(get_data(PS4EH_URL))
            print('>> Updated start.py')
    except (IOError, PermissionError):
        print('ERROR: Unable to access start.py')
    try:
        with open(os.path.join(CWD, 'FakeDns', 'main.py'), 'w+') as buf:
            buf.write(get_data(FDNS_URL))
            print('>> Updated FakeDns/main.py')
    except (IOError, PermissionError):
        print('ERROR: Unable to access FakeDns/main.py')


if __name__ == '__main__':
    main()
