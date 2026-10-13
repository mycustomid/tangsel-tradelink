import subprocess
import sys
import os

prompt_file = r'D:\code\tangsel-tradelink\scripts\codex_prompt.txt'
with open(prompt_file, 'r', encoding='utf-8') as f:
    prompt = f.read()

codex_cmd = r'C:\Users\Lenovo\AppData\Roaming\npm\codex.cmd'

cmd = [
    codex_cmd,
    'exec',
    prompt,
    '--dangerously-bypass-approvals-and-sandbox',
    '--skip-git-repo-check',
    '--ephemeral'
]

print("Launching Codex with full prompt...")
process = subprocess.Popen(
    cmd,
    stdin=subprocess.PIPE,
    stdout=sys.stdout,
    stderr=sys.stderr,
    text=True,
    cwd=r'D:\code\tangsel-tradelink'
)

# Send EOF to stdin so it doesn't wait
process.stdin.close()
ret = process.wait()
print(f"Codex finished with exit code {ret}")
sys.exit(ret)
