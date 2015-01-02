package no.rbio.elfish;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

public class WebAppInterface {
	private final Context mContext;

	/** Instantiate the interface and set the context */
	public WebAppInterface(Context c) {
		mContext = c;
	}

	@JavascriptInterface
	public void toClipboard(String s) {
		ClipboardManager cm = (ClipboardManager) mContext.getSystemService(mContext.CLIPBOARD_SERVICE);

		// TODO mime type = CSV
		ClipData cd = ClipData.newPlainText("ElFish CSV", s);

		cm.setPrimaryClip(cd);

		showToast("CSV copied to clipboard");
	}

	@JavascriptInterface
	public void share(String subject, String shareBody) {
		Intent sharingIntent = new Intent(android.content.Intent.ACTION_SEND);
		sharingIntent.setType("text/plain");
		sharingIntent.putExtra(android.content.Intent.EXTRA_SUBJECT, subject);
		sharingIntent.putExtra(android.content.Intent.EXTRA_TEXT, shareBody);
		mContext.startActivity(Intent.createChooser(sharingIntent, "Share ElFish data with"));
	}

	/** Show a toast from the web page */
	@JavascriptInterface
	public void showToast(String toast) {
		Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
	}

	/** Write csv to file */
	@JavascriptInterface
	public void write(String filename, String csv) {
		try {
			File myFile = new File("/sdcard/" + filename + ".csv");
			myFile.createNewFile();
			FileOutputStream fOut = new FileOutputStream(myFile);
			OutputStreamWriter myOutWriter = new OutputStreamWriter(fOut);
			myOutWriter.append(csv);
			myOutWriter.close();
			fOut.close();
			Toast.makeText(mContext, "Done writing CSV", Toast.LENGTH_SHORT).show();
		} catch (IOException e) {
			Toast.makeText(mContext, e.getMessage(), Toast.LENGTH_SHORT).show();
		}
	}

}
